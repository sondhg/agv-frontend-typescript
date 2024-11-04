"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { postCreateOrder } from "@/services/apiServices";
import { endPoints, loadNames, startPoints } from "@/utils/arraysUsedOften";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Generate weight mapping dynamically
// Define the weightMapping with an explicit type
const weightMapping: { [key: string]: number } = loadNames.reduce(
  (acc, loadName, index) => {
    acc[loadName] = index + 1;
    return acc;
  },
  {} as { [key: string]: number },
);

// * Example output if loadNames = ['Stone', 'Cement', 'Iron']
// {
//     Stone: 1,
//     Cement: 2,
//     Iron: 3
// }

const FormSchema = z.object({
  order_id: z.string().min(1).max(3).regex(/^\d+$/, "Order ID must be numeric"),
  order_date: z.date({
    required_error: "Must select a date.",
  }),
  start_time: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
      "Time must be in 23h format hh:mm:ss",
    ),
  start_point: z.string().min(1).max(2),
  end_point: z.string().min(1).max(2),
  load_name: z.string().min(1),
  load_amount: z
    .string()
    .regex(/^\d*$/, "Load amount must contain only numerical characters.")
    .min(1)
    .max(3),
  load_weight: z.string().min(1),
});

interface FormCreateOrderProps {
  onClose: () => void; // Accept a prop to close the dialog
  fetchListOrders: () => void;
}

export function FormCreateOrder({
  onClose,
  fetchListOrders,
}: FormCreateOrderProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      order_id: "",
      order_date: undefined,
      start_time: "",
      start_point: "",
      end_point: "",
      load_name: "",
      load_amount: "",
      load_weight: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Convert order_date to dd/MM/yyyy format before logging or processing
    const formattedDate = format(data.order_date, "dd/MM/yyyy");
    const submittedData = {
      ...data,
      order_date: formattedDate, // Replace the Date object with the formatted string
    };
    console.log("Form submitted:", submittedData); // Check if this logs
    try {
      const response = await postCreateOrder(submittedData);
      fetchListOrders(); // Refresh the orders list
      console.log("Order created successfully:", response);
      onClose(); // Close the dialog on successful submission
      toast({
        title: "Order sent to server!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(response, null, 2)}
            </code>
          </pre>
        ),
      });
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error creating order",
        description: "There was an error creating the order. Please try again.",
      });
    }
  }

  const { setValue, watch } = form;

  // Watch for changes to load_name and load_amount
  const loadName = watch("load_name");
  const loadAmount = watch("load_amount");

  useEffect(() => {
    // Parse load_amount as a number
    const amount = parseInt(loadAmount || "0", 10);
    const weightPerUnit = weightMapping[loadName] || 0;
    const calculatedWeight = amount * weightPerUnit;

    // Update load_weight field
    setValue("load_weight", calculatedWeight.toString());
  }, [loadName, loadAmount, setValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          <FormField
            control={form.control}
            name="order_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter integer from 1 to 999" {...field} />
                </FormControl>
                <FormDescription>
                  Unique ID you assign to this order.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {/* Dù chọn kiểu nào thì data khi submit vẫn là string dạng dd/MM/yyyy */}
                        {/* Nếu muốn hiện kiểu 11/31/2021 thì sử dụng toLocaleDateString */}

                        {/* {field.value ? (
                          // Format the date as dd/MM/yyyy
                          field.value.toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })
                        ) : (
                          <span>Pick a date in format dd/MM/yyyy</span>
                        )} */}

                        {/* Nếu muốn hiện kiểu November 1, 2021 thì sử dụng format(field.value, "PPP") */}

                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      // Disable past dates by setting the minimum date to today
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Date (dd/MM/yyyy) you expect AGVs to perform this order.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input placeholder="Enter in format HH:mm:ss" {...field} />
                </FormControl>
                <FormDescription>
                  Timestamp of the Order Date you selected that you expect AGVs
                  to perform this order.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Point</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={`Select between ${startPoints[0]} and ${startPoints[startPoints.length - 1]}`}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {startPoints.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Start point of this order's route.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Point</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={`Select between ${endPoints[0]} and ${endPoints[endPoints.length - 1]}`}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {endPoints.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  End point of this order's route.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="load_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Load Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={"Select a load name"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {loadNames.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Material type of the load.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="load_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Load Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter integer greater or equal to 0"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Number of load units.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="load_weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Load Weight</FormLabel>
                <FormControl>
                  <Input readOnly placeholder="Read-only field" {...field} />
                </FormControl>
                <FormDescription>
                  <b>Calculated</b> total weight of load.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
