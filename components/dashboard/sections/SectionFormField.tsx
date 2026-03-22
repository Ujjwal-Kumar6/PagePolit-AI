import React, { useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type Tone = "strict" | "neutral" | "friendly" | "empathetic";

interface FormData {
  name: string;
  description: string;
  tone: Tone;
  fallbackBehavior: string;
}

const TONE_OPTION = [
  {
    value: "strict",
    label: "Strict",
    badge: "Fact-based",
    description: "Only answer if fully confident. No small talk."
  },
  {
    value: "neutral",
    label: "Neutral",
    description: "Professional and concise."
  },
  {
    value: "friendly",
    label: "Friendly",
    description: "Warm and conversational."
  },
  {
    value: "empathetic",
    label: "Empathetic",
    description: "Supportive and calming."
  }
];

interface KnowledgeSource {
  id: string;
  name: string;
  type: string;
}

interface SectionFormFieldProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  selectedSource: string[];
  setSelectedSource: (source: string[]) => void;
  knowledgeSource: KnowledgeSource[];
  isLodingSource: boolean;
  isDisabled: boolean;
}

const SectionFormField = ({
  formData,
  setFormData,
  selectedSource,
  setSelectedSource,
  knowledgeSource,
  isLodingSource,
  isDisabled
}: SectionFormFieldProps) => {

  /* ---------------- HANDLERS ---------------- */

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, name: e.target.value });
    },
    [formData, setFormData]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, description: e.target.value });
    },
    [formData, setFormData]
  );

  const handleToneChange = useCallback(
    (value: string) => {
      setFormData({ ...formData, tone: value as Tone });
    },
    [formData, setFormData]
  );

  const handleAddSource = useCallback(
    (value: string) => {
      if (!selectedSource.includes(value)) {
        setSelectedSource([...selectedSource, value]);
      }
    },
    [selectedSource, setSelectedSource]
  );

  const handleRemoveSource = useCallback(
    (id: string) => {
      setSelectedSource(selectedSource.filter((s) => s !== id));
    },
    [selectedSource, setSelectedSource]
  );

  /* ---------------- MEMOIZED DATA ---------------- */

  const sourceMap = useMemo(() => {
    const map = new Map();
    knowledgeSource.forEach((s) => map.set(s.id, s));
    return map;
  }, [knowledgeSource]);

  const attachedSources = useMemo(() => {
    return selectedSource
      .map((id) => sourceMap.get(id))
      .filter(Boolean);
  }, [selectedSource, sourceMap]);

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 overflow-y-auto no-scrollbar">

      {/* BASICS */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase">
          Basics
        </h4>

        <div className="space-y-2">
          <Label>Section Name</Label>
          <Input
            value={formData.name}
            onChange={handleNameChange}
            disabled={isDisabled}
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Input
            value={formData.description}
            onChange={handleDescriptionChange}
            disabled={isDisabled}
          />
        </div>
      </div>

      {/* DATA SOURCES */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase">
            Data Sources
          </h4>

          <span className="text-xs text-zinc-500">
            {selectedSource.length} attached
          </span>
        </div>

        <Select
          value={selectedSource[0] || ""}
          onValueChange={handleAddSource}
          disabled={isDisabled}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                isLodingSource
                  ? "Loading..."
                  : "Select Knowledge Source"
              }
            />
          </SelectTrigger>

          <SelectContent>
            {knowledgeSource.length > 0 ? (
              knowledgeSource.map((source) => (
                <SelectItem key={source.id} value={source.id}>
                  [{source.type}] {source.name}
                </SelectItem>
              ))
            ) : (
              <div className="p-3 text-sm text-zinc-500">
                No sources available
              </div>
            )}
          </SelectContent>
        </Select>

        {/* ATTACHED SOURCES */}
        {attachedSources.length > 0 && (
          <div className="space-y-2">
            {attachedSources.map((source) => (
              <div
                key={source.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  [{source.type}] {source.name}
                </span>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveSource(source.id)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TONE */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase">
          Tone
        </h4>

        <RadioGroup
          value={formData.tone}
          onValueChange={handleToneChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {TONE_OPTION.map((option) => {

            const active = formData.tone === option.value;

            return (
              <Label
                key={option.value}
                htmlFor={option.value}
                className={`cursor-pointer border rounded-lg p-4 transition
                ${
                  active
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-zinc-700 hover:bg-zinc-800"
                }`}
              >

                <div className="flex items-start gap-3">

                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                  />

                  <div>
                    <div className="flex gap-2 items-center">
                      <span className="font-medium">
                        {option.label}
                      </span>

                      {option.badge && (
                        <span className="text-xs text-red-400">
                          {option.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-500">
                      {option.description}
                    </p>
                  </div>

                </div>

              </Label>
            );
          })}
        </RadioGroup>
      </div>
      

    </div>
  );
};

export default React.memo(SectionFormField);