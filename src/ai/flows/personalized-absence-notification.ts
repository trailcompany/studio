'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized absence notification messages for parents/guardians.
 *
 * It includes:
 * - `generatePersonalizedAbsenceNotification`: A function to trigger the flow.
 * - `PersonalizedAbsenceNotificationInput`: The input type for the function.
 * - `PersonalizedAbsenceNotificationOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAbsenceNotificationInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  parentName: z.string().describe('The name of the parent or guardian.'),
  absenceCount: z.number().describe('The number of recent absences.'),
  academicPerformance: z
    .string()
    .describe('A brief description of the student’s academic performance.'),
  teacherNotes: z
    .string()
    .optional()
    .describe('Optional notes from the teacher regarding the student.'),
});

export type PersonalizedAbsenceNotificationInput = z.infer<
  typeof PersonalizedAbsenceNotificationInputSchema
>;

const PersonalizedAbsenceNotificationOutputSchema = z.object({
  notificationMessage: z
    .string()
    .describe('The personalized absence notification message.'),
});

export type PersonalizedAbsenceNotificationOutput = z.infer<
  typeof PersonalizedAbsenceNotificationOutputSchema
>;

export async function generatePersonalizedAbsenceNotification(
  input: PersonalizedAbsenceNotificationInput
): Promise<PersonalizedAbsenceNotificationOutput> {
  return personalizedAbsenceNotificationFlow(input);
}

const personalizedAbsenceNotificationPrompt = ai.definePrompt({
  name: 'personalizedAbsenceNotificationPrompt',
  input: {schema: PersonalizedAbsenceNotificationInputSchema},
  output: {schema: PersonalizedAbsenceNotificationOutputSchema},
  prompt: `You are an AI assistant tasked with generating personalized absence notification messages for parents/guardians.

  Given the following information about a student, create a message that informs the parent/guardian about the student's absences and encourages improved attendance.

  Student Name: {{{studentName}}}
  Parent/Guardian Name: {{{parentName}}}
  Number of Recent Absences: {{{absenceCount}}}
  Academic Performance: {{{academicPerformance}}}
  Teacher Notes: {{{teacherNotes}}}

  Compose a message that is empathetic, informative, and encouraging. Clearly state the number of absences, briefly mention the student's academic performance, and suggest ways to improve attendance. If teacher notes are provided, incorporate them appropriately.
  Make the message concise and easy to read.
  Ensure that the generated message is appropriate for sending to a parent/guardian.
  The message should be no more than 150 words.
`,
});

const personalizedAbsenceNotificationFlow = ai.defineFlow(
  {
    name: 'personalizedAbsenceNotificationFlow',
    inputSchema: PersonalizedAbsenceNotificationInputSchema,
    outputSchema: PersonalizedAbsenceNotificationOutputSchema,
  },
  async input => {
    const {output} = await personalizedAbsenceNotificationPrompt(input);
    return output!;
  }
);

