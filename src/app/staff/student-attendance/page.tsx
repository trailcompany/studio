"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTitle } from "@/components/ui/page-title";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// Mock data - replace with actual data fetching
const students = [
  { id: "1", name: "Alice Smith" },
  { id: "2", name: "Bob Johnson" },
  { id: "3", name: "Charlie Brown" },
  { id: "4", name: "Diana Prince" },
];

const courses = [
  { id: "C101", name: "Introduction to Computer Science" },
  { id: "M202", name: "Calculus II" },
  { id: "P303", name: "Physics for Engineers" },
];

type AttendanceRecord = {
  id: string;
  studentName: string;
  courseName: string;
  date: string;
  status: "Present" | "Absent" | "Late";
};

const initialAttendanceRecords: AttendanceRecord[] = [
  { id: "a1", studentName: "Alice Smith", courseName: "Calculus II", date: format(new Date(2024, 6, 15), "yyyy-MM-dd"), status: "Present" },
  { id: "a2", studentName: "Bob Johnson", courseName: "Calculus II", date: format(new Date(2024, 6, 15), "yyyy-MM-dd"), status: "Absent" },
  { id: "a3", studentName: "Alice Smith", courseName: "Calculus II", date: format(new Date(2024, 6, 16), "yyyy-MM-dd"), status: "Late" },
];

export default function StudentAttendancePage() {
  const [selectedStudent, setSelectedStudent] = React.useState<string>("");
  const [selectedCourse, setSelectedCourse] = React.useState<string>("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [status, setStatus] = React.useState<"Present" | "Absent" | "Late">("Present");
  const [attendanceRecords, setAttendanceRecords] = React.useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { toast } = useToast();

  const handleAddAttendance = () => {
    if (!selectedStudent || !selectedCourse || !date) {
      toast({ title: "Error", description: "Please select student, course, and date.", variant: "destructive" });
      return;
    }
    const student = students.find(s => s.id === selectedStudent);
    const course = courses.find(c => c.id === selectedCourse);

    if (!student || !course) {
       toast({ title: "Error", description: "Invalid student or course.", variant: "destructive" });
      return;
    }

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      studentName: student.name,
      courseName: course.name,
      date: format(date, "yyyy-MM-dd"),
      status,
    };
    setAttendanceRecords(prev => [newRecord, ...prev]);
    toast({ title: "Success", description: `Attendance for ${student.name} recorded as ${status}.` });
    // Reset form
    setSelectedStudent("");
    setSelectedCourse("");
    // setDate(new Date()); // Keep date or reset as preferred
    setStatus("Present");
  };

  const filteredRecords = attendanceRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <PageTitle title="Student Attendance Management" subtitle="Record and view student attendance.">
        <Button variant="outline" asChild>
          <Link href="/staff/dashboard"><Icons.Back className="mr-2 h-4 w-4" />Back to Dashboard</Link>
        </Button>
      </PageTitle>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Record Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="student">Student</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger id="student">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Icons.CalendarDays className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: "Present" | "Absent" | "Late") => setStatus(value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddAttendance} className="w-full">
              <Icons.Attendance className="mr-2 h-4 w-4" /> Add Record
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Attendance Log</CardTitle>
            <div className="mt-2">
              <Input
                placeholder="Search by student or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? filteredRecords.map(record => (
                  <TableRow key={record.id}>
                    <TableCell>{record.studentName}</TableCell>
                    <TableCell>{record.courseName}</TableCell>
                    <TableCell>{format(new Date(record.date), "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-semibold",
                          record.status === "Present" && "bg-accent text-accent-foreground",
                          record.status === "Absent" && "bg-destructive text-destructive-foreground",
                          record.status === "Late" && "bg-yellow-400 text-yellow-900"
                        )}
                      >
                        {record.status}
                      </span>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">No records found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
