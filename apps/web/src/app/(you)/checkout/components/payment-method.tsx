import { RadioGroupItem } from "@/components/ui/radio-group";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Truck } from "lucide-react";

export function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-medium">
            4
          </div>
          Payment method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="cash" id="cash" />
            <Label
              htmlFor="cash"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Truck className="h-4 w-4" />
              Cash on Delivery
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
