"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BasicInfo } from "@/components/property-steps/basic-info";
import { LegalInfo } from "@/components/property-steps/legal-info";
import { LocationInfo } from "@/components/property-steps/location-info";
import { LotsInfo } from "@/components/property-steps/lots-info";
import { Summary } from "@/components/property-steps/summary";
import { useToast } from "@/components/ui/use-toast";
import { Steps } from "@/components/steps";
import { addProperty } from "@/utils/property.http";
import { User } from "@/lib/types/auth";

import {
  basicInfoSchema,
  legalInfoSchema,
  locationInfoSchema,
  lotsInfoSchema,
  type BasicInfoValues,
  type LegalInfoValues,
  type LocationInfoValues,
  type LotsInfoValues,
} from "@/lib/validations/property";
import { useAuth } from "@/contexts/auth-context";

const steps = [
  { title: "Información Básica", description: "Nombre, descripción y fotos" },
  { title: "Información Legal", description: "Documentos y datos legales" },
  { title: "Ubicación", description: "Coordenadas y mapa" },
  { title: "Lotes", description: "Precios y cantidades" },
  { title: "Resumen", description: "Revisar y guardar" },
];

interface FormData {
  basicInfo: BasicInfoValues;
  legalInfo: LegalInfoValues;
  locationInfo: LocationInfoValues;
  lotsInfo: LotsInfoValues;
}

export function PropertyStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const auth = useAuth();
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      name: "",
      description: "",
      images: [],
      departmentId: "",
      departmentLocation: {
        lat: 0,
        long: 0,
      },
      cityId: "",
      neighborhoodId: "",
      address: "",
    },
    legalInfo: {
      propertyNumber: "",
      registryInfo: "",
      documents: [],
    },
    locationInfo: {
      coordinates: [],
      manualCoordinates: "",
    },
    lotsInfo: {
      lots: [
        {
          price: 0,
          number: "",
          area: 0,
          status: "available",
          coordinates:[[0,0]],
    },
      ],
    }
  });
 

  const { toast } = useToast();

  const updateFormData = (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
    setFormData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
    setErrors({});
  };

  const validateStep = (step: number) => {
    try {
      let validationResult;
      switch (step) {
        case 0:
          console.log("Current Step: ", currentStep);

          validationResult = basicInfoSchema.safeParse(formData.basicInfo);
          break;
        case 1:
          console.log("Current Step: ", currentStep);

          validationResult = legalInfoSchema.safeParse(formData.legalInfo);
          break;
        case 2:
          console.log("Current Step: ", currentStep);

          validationResult = locationInfoSchema.safeParse(formData.locationInfo);
          break;
        case 3:
          console.log("Current Step: ", currentStep);

          validationResult = lotsInfoSchema.safeParse(formData.lotsInfo);
          console.log("formData.lotsInfo: ", formData.lotsInfo);
          console.log("Validation result: ", validationResult);
          break;
        default:
          console.log("Current Step: ", currentStep);
          return true;
      }

      if (!validationResult.success) {
        const newErrors: Record<string, string[]> = {};
        validationResult.error.errors.forEach((error) => {
          const field = error.path[0] as string;
          if (!newErrors[field]) {
            newErrors[field] = [];
          }
          newErrors[field].push(error.message);
        });
        setErrors(newErrors);
        return false;
      }

      setErrors({});
      return true;
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep || (step === currentStep + 1 && validateStep(currentStep))) {
      setCurrentStep(step);
      setErrors({});
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    const allStepsValid = [0, 1, 2, 3].every(step => validateStep(step));

    if (!allStepsValid) {
      toast({
        title: "Error",
        description: "Por favor corrija los errores antes de continuar",
        variant: "destructive",
      });
      return;
    }


    try {
      const { user } = auth;
      const token = user?.token || "";
    
      
      const propertyData = {
        name: formData.basicInfo.name,
        description: formData.basicInfo.description,
        images: formData.basicInfo.images, //  falta parsear las imagenes
        price: formData.lotsInfo.lots.reduce((sum, lot) => sum + lot.price, 0), // precio tatalxd
        size: formData.lotsInfo.lots.reduce((sum, lot) => sum + lot.area, 0), //area total
        type: "Residencial", 
        location: formData.basicInfo.address, 
        coordinates: formData.locationInfo.coordinates, 
        propertyNumber: formData.legalInfo.propertyNumber,
        registryInfo: formData.legalInfo.registryInfo, 
        departmentId: formData.basicInfo.departmentId, 
        cityId: formData.basicInfo.cityId, 
        neighborhoodId: formData.basicInfo.neighborhoodId || '', 
        address: formData.basicInfo.address,
        manualCoordinates: formData.locationInfo.manualCoordinates || "",
        documents: formData.legalInfo.documents || [],
        lots: formData.lotsInfo.lots.map(lot => ({
          number: lot.number,
          area: lot.area,
          price: lot.price,
          status: lot.status,
          coordinates: lot.coordinates // Coordenadas de cada lote
        }))
      };
      const json = JSON.stringify(propertyData);

      console.log("json: ", json); // Verifica la estructura

      await addProperty(json, token); // Enviar la solicitud

  
      toast({
        title: "Éxito",
        description: "La propiedad fue guardada correctamente.",
      });
    } catch (error: any) {
      console.error("Error al guardar la propiedad:", error);
      toast({
        title: "Error",
        description: error.message || "Hubo un error al guardar la propiedad.",
        variant: "destructive",
      });
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfo
            data={formData.basicInfo}
            onUpdate={(data) => updateFormData("basicInfo", data)}
            errors={errors}
          />
        );
      case 1:
        return (
          <LegalInfo
            data={formData.legalInfo}
            onUpdate={(data) => updateFormData("legalInfo", data)}
            errors={errors}
          />
        );
      case 2:
        return (
          <LocationInfo
            data={formData.locationInfo}
            location={formData.basicInfo.departmentLocation}
            onUpdate={(data) => updateFormData("locationInfo", data)}
            errors={errors}
          />
        );
      case 3:
        return (
          <LotsInfo
           
            data={formData.lotsInfo} 
            location={formData.locationInfo.coordinates}
             onUpdate={(data) => updateFormData("lotsInfo", data)} 
             errors={errors}
          />
        );
      case 4:
        return <Summary data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <Steps
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      <Card className="p-6">
        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}>
              Guardar Terreno
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Siguiente
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}