"use client";

import { Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Steps({ steps, currentStep, onStepClick }: StepsProps) {
  return (
    <div className="relative">
      <div className="absolute top-5 left-1 right-1 h-0.5 bg-muted">
        <div
          className="absolute h-full bg-primary transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <button
              key={step.title}
              className={`
                flex flex-col items-center text-center
                ${onStepClick ? "cursor-pointer" : "cursor-default"}
                ${isCompleted || isCurrent ? "text-primary" : "text-muted-foreground"}
              `}
              onClick={() => onStepClick?.(index)}
              disabled={!onStepClick}
            >
              <div
                className={`
                  relative z-10 flex h-10 w-10 items-center justify-center rounded-full
                  border-2 transition-colors duration-200
                  ${
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                      ? "border-primary bg-background"
                      : "border-muted bg-background"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <div className="mt-2 w-32">
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}