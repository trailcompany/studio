"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { Icons } from "@/components/icons";
import Link from "next/link";

type CollegeEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  imageUrl: string;
  imageHint: string;
};

// Mock data - replace with actual data fetching
const eventsData: CollegeEvent[] = [
  {
    id: "1",
    title: "Annual Tech Fest 2024",
    date: "October 26-28, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium & Tech Park",
    description: "Join us for three days of exciting tech talks, workshops, coding competitions, and project showcases. Network with industry experts and explore the latest innovations.",
    category: "Technology",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "technology conference"
  },
  {
    id: "2",
    title: "Guest Lecture: The Future of AI",
    date: "November 5, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Lecture Hall C",
    description: "Esteemed Dr. Aris Thorne will discuss the advancements and ethical considerations in Artificial Intelligence. Q&A session included.",
    category: "Academics",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "lecture hall"
  },
  {
    id: "3",
    title: "Inter-College Sports Meet",
    date: "November 12-14, 2024",
    time: "All Day",
    location: "College Sports Complex",
    description: "Cheer for your college teams in various sports including football, basketball, volleyball, and athletics. Show your spirit!",
    category: "Sports",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "sports stadium"
  },
  {
    id: "4",
    title: "Art & Photography Exhibition",
    date: "November 20, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Fine Arts Gallery",
    description: "Experience the creativity of our students. Featuring paintings, sculptures, digital art, and stunning photography.",
    category: "Arts & Culture",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "art gallery"
  },
];

export default function EventsPage() {
  return (
    <>
      <PageTitle title="College Events" subtitle="Stay informed about upcoming campus activities and happenings.">
        <Button variant="outline" asChild>
            <Link href="/student/dashboard"><Icons.Back className="mr-2 h-4 w-4" />Back to Dashboard</Link>
        </Button>
      </PageTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map(event => (
          <Card key={event.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 w-full">
              <Image
                src={event.imageUrl}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={event.imageHint}
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-xl mb-1">{event.title}</CardTitle>
                <Badge variant="secondary">{event.category}</Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="flex items-center"><Icons.CalendarDays className="mr-2 h-4 w-4 text-primary" /> {event.date}</p>
                <p className="flex items-center"><Icons.Notification className="mr-2 h-4 w-4 text-primary" /> {event.time}</p> {/* Using Bell as generic time/schedule icon */}
                <p className="flex items-center"><Icons.MapPin className="mr-2 h-4 w-4 text-primary" /> {event.location}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{event.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Icons.CalendarCheck className="mr-2 h-4 w-4" /> Add to Calendar (Mock)
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
