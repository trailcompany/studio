"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generatePersonalizedAbsenceNotification, type PersonalizedAbsenceNotificationInput, type PersonalizedAbsenceNotificationOutput } from "@/ai/flows/personalized-absence-notification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const notificationSchema = z.object({
  studentName: z.string().min(1, "Student name is required."),
  parentName: z.string().min(1, "Parent/Guardian name is required."),
  absenceCount: z.coerce.number().min(1, "Absence count must be at least 1.").max(100),
  academicPerformance: z.string().min(1, "Academic performance description is required."),
  teacherNotes: z.string().optional(),
});

export function PersonalizedNotificationForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isApproving, setIsApproving] = React.useState(false);
  const [generatedMessage, setGeneratedMessage] = React.useState<string | null>(null);
  const [editableMessage, setEditableMessage] = React.useState<string>("");
  const { toast } = useToast();

  const form = useForm<PersonalizedAbsenceNotificationInput>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      studentName: "",
      parentName: "",
      absenceCount: 1,
      academicPerformance: "",
      teacherNotes: "",
    },
  });

  const handleGenerateNotification = async (data: PersonalizedAbsenceNotificationInput) => {
    setIsLoading(true);
    setGeneratedMessage(null);
    setEditableMessage("");
    try {
      const result: PersonalizedAbsenceNotificationOutput = await generatePersonalizedAbsenceNotification(data);
      setGeneratedMessage(result.notificationMessage);
      setEditableMessage(result.notificationMessage);
      toast({
        title: "Notification Generated",
        description: "Review the message below and approve or edit.",
      });
    } catch (error) {
      console.error("Error generating notification:", error);
      toast({
        title: "Error Generating Notification",
        description: (error as Error).message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveAndSend = async () => {
    setIsApproving(true);
    // Simulate sending notification
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Notification Sent!",
      description: "The personalized absence notification has been sent to the parent/guardian.",
      className: "bg-accent text-accent-foreground",
    });
    setGeneratedMessage(null);
    setEditableMessage("");
    form.reset();
    setIsApproving(false);
  };
  
  const handleDiscard = () => {
    setGeneratedMessage(null);
    setEditableMessage("");
    form.reset();
     toast({
        title: "Notification Discarded",
        description: "The generated message has been discarded.",
      });
  };


  return (
    <Card className="w-full shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGenerateNotification)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Create Absence Notification</CardTitle>
            <CardDescription>
              Fill in the student's details to generate a personalized notification for their parent/guardian.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} disabled={isLoading || !!generatedMessage} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent/Guardian Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} disabled={isLoading || !!generatedMessage} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="absenceCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Recent Absences</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 3" {...field} disabled={isLoading || !!generatedMessage} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="academicPerformance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Academic Performance</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Showing improvement in Math, but struggling with assignments." {...field} disabled={isLoading || !!generatedMessage} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacherNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Has missed crucial lab sessions." {...field} disabled={isLoading || !!generatedMessage} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             {!generatedMessage && (
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Icons.Settings className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.Megaphone className="mr-2 h-4 w-4" />
                )}
                Generate Notification
              </Button>
            )}
          </CardContent>
        </form>
      </Form>

      {generatedMessage && (
        <>
          <CardContent className="mt-6 border-t pt-6">
            <h3 className="font-headline text-lg font-semibold mb-2">Generated Notification:</h3>
            <Textarea
              value={editableMessage}
              onChange={(e) => setEditableMessage(e.target.value)}
              rows={8}
              className="mb-4 p-3 border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-muted/30"
              aria-label="Editable generated notification message"
            />
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={handleDiscard} disabled={isApproving}>
              <Icons.Discard className="mr-2 h-4 w-4" /> Discard
            </Button>
            <Button onClick={handleApproveAndSend} disabled={isApproving} className="bg-accent hover:bg-accent/90">
              {isApproving ? (
                <Icons.Send className="mr-2 h-4 w-4 animate-pulse" />
              ) : (
                <Icons.Approve className="mr-2 h-4 w-4" />
              )}
              Approve & Send
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
