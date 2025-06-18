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
const staffMembers = [
  { id: "S1", name: "Dr. Emily Carter (Professor)" },
  { id: "S2", name: "Mr. John Davis (Lecturer)" },
  { id: "S3", name: "Ms. Sarah Wilson (Admin Staff)" },
  { id: "S4", name: "Mr. David Lee (Lab Technician)" },
];

type StaffAttendanceRecord = {
  id: string;
  staffName: string;
  date: string;
  status: "Present" | "Absent" | "On Leave";
};

const initialStaffAttendanceRecords: StaffAttendanceRecord[] = [
  { id: "sa1", staffName: "Dr. Emily Carter (Professor)", date: format(new Date(2024, 6, 15), "yyyy-MM-dd"), status: "Present" },
  { id: "sa2", staffName: "Mr. John Davis (Lecturer)", date: format(new Date(2024, 6, 15), "yyyy-MM-dd"), status: "Absent" },
  { id: "sa3", staffName: "Ms. Sarah Wilson (Admin Staff)", date: format(new Date(2024, 6, 16), "yyyy-MM-dd"), status: "On Leave" },
];

export default function StaffAttendancePage() {
  const [selectedStaff, setSelectedStaff] = React.useState<string>("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [status, setStatus] = React.useState<"Present" | "Absent" | "On Leave">("Present");
  const [staffAttendanceRecords, setStaffAttendanceRecords] = React.useState<StaffAttendanceRecord[]>(initialStaffAttendanceRecords);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { toast } = useToast();

  const handleAddAttendance = () => {
    if (!selectedStaff || !date) {
      toast({ title: "Error", description: "Please select staff member and date.", variant: "destructive" });
      return;
    }
    const staffMember = staffMembers.find(s => s.id === selectedStaff);

    if (!staffMember) {
       toast({ title: "Error", description: "Invalid staff member.", variant: "destructive" });
      return;
    }

    const newRecord: StaffAttendanceRecord = {
      id: `satt-${Date.now()}`,
      staffName: staffMember.name,
      date: format(date, "yyyy-MM-dd"),
      status,
    };
    setStaffAttendanceRecords(prev => [newRecord, ...prev]);
    toast({ title: "Success", description: `Attendance for ${staffMember.name} recorded as ${status}.` });
    // Reset form
    setSelectedStaff("");
    // setDate(new Date()); // Keep date or reset as preferred
    setStatus("Present");
  };

  const filteredRecords = staffAttendanceRecords.filter(record =>
    record.staffName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <PageTitle title="Staff Attendance Management" subtitle="Record and view staff attendance.">
        <Button variant="outline" asChild>
          <Link href="/admin/dashboard"><Icons.Back className="mr-2 h-4 w-4" />Back to Dashboard</Link>
        </Button>
      </PageTitle>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Record Staff Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="staffMember">Staff Member</Label>
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger id="staffMember">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {staffMembers.map(staff => (
                    <SelectItem key={staff.id} value={staff.id}>{staff.name}</SelectItem>
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
              <Select value={status} onValueChange={(value: "Present" | "Absent" | "On Leave") => setStatus(value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
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
            <CardTitle className="font-headline">Staff Attendance Log</CardTitle>
            <div className="mt-2">
              <Input
                placeholder="Search by staff name..."
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
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? filteredRecords.map(record => (
                  <TableRow key={record.id}>
                    <TableCell>{record.staffName}</TableCell>
                    <TableCell>{format(new Date(record.date), "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-semibold",
                          record.status === "Present" && "bg-accent text-accent-foreground",
                          record.status === "Absent" && "bg-destructive text-destructive-foreground",
                          record.status === "On Leave" && "bg-blue-400 text-blue-900"
                        )}
                      >
                        {record.status}
                      </span>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">No records found.</TableCell>
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
