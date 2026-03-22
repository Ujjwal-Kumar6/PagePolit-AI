import { summarizeMarkdown } from "@/lib/AImodal";
import { isLogin } from "@/lib/isLogin";
import { ZenRows } from "zenrows";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/clint";
import { knowledge_source } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const user = await isLogin();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";

    // ── MULTIPART (FILE UPLOAD) ──────────────────────────────────────────────
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const type = (formData.get("type") as string) || "";

      if (type !== "upload") {
        return NextResponse.json(
          { error: "Invalid multipart request type" },
          { status: 400 }
        );
      }

      const file = formData.get("file") as File;
      if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
      }

      const fileContent = await file.text();
      const lines = fileContent.split("\n").filter(Boolean);
      const headers = lines[0]?.split(",").map((h) => h.trim()) ?? [];
      const markdown = await summarizeMarkdown(fileContent);
      console.log("File summarized:", markdown);

      await db.insert(knowledge_source).values({
          userEmail: user.email,
          type: "upload",
          name: file.name,
          status:"active",
          content: markdown,
          web_data: JSON.stringify({
            fileName: file.name,
            fileSize: file.size,
            rowCount: lines.length -1,
            headers:headers,
          })
        });

      return NextResponse.json(
        { message: "File processed successfully" },
        { status: 200 }
      );
    }

    // ── JSON ─────────────────────────────────────────────────────────────────
    const body = await req.json();
    const type: string = body.type;

    console.log("Received body:", body);
    console.log("Type:", type);

    // ── WEBSITE ──────────────────────────────────────────────────────────────
    if (type === "webdata") {
      if (!body.url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
      }

      const targetUrl = body.url.trim();

      const apiKey = process.env.ZENROWS_API_KEY;
      if (!apiKey) {
        return NextResponse.json(
          { error: "ZenRows API key is not configured" },
          { status: 500 }
        );
      }

      console.log("Fetching with ZenRows SDK:", targetUrl);

      try {
        const client = new ZenRows(apiKey);
        const request = await client.get(targetUrl, {
          response_type: "markdown",
        });
        const html = await request.text();

        console.log("ZenRows success, length:", html.length);
        console.log("ZenRows preview:", html.slice(0, 300));

        const markdown = await summarizeMarkdown(html);
        console.log("Website summarized:", markdown);

        await db.insert(knowledge_source).values({
          userEmail: user.email,
          type: "website",
          name: body.url,
          status:"active",
          content: markdown,
        });

        return NextResponse.json(
          { message: "Website processed successfully" },
          { status: 200 }
        );
      } catch (err: any) {
        console.error("ZenRows error:", err.message);
        if (err.response) {
          console.error("ZenRows response:", err.response.data);
        }
        return NextResponse.json(
          { error: "Failed to scrape website", detail: err.message },
          { status: 502 }
        );
      }
    }

    // ── TEXT / DOCS ───────────────────────────────────────────────────────────
    if (type === "text") {
      if (!body.title?.trim()) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
      }
      if (!body.content?.trim()) {
        return NextResponse.json({ error: "Content is required" }, { status: 400 });
      }

      const markdown = await summarizeMarkdown(
        `Title: ${body.title}\n\n${body.content}`
      );
      console.log("Text summarized:", markdown);

      await db.insert(knowledge_source).values({
          userEmail: user.email,
          type: "text",
          name: body.title,
          status:"active",
          content: markdown,
        });

      return NextResponse.json(
        { message: "Text processed successfully" },
        { status: 200 }
      );
    }

    // ── UNKNOWN TYPE ──────────────────────────────────────────────────────────
    return NextResponse.json(
      { error: `Invalid request type: "${type}"` },
      { status: 400 }
    );

  } catch (error) {
    console.error("Error in /api/knowledge/store:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}