export type AppEvent = {
    id: string;
    title: string;
    date: string;
    category: string;
    description: string;
    city: string;
    venue: string;
    hostUid: string;
    hostedBy: string;
    hostPhotoURL: string;
    attendees: Attendee[];
    attendeeIds: string[];
    isCancelled: boolean;
    isHost?: boolean;
    isGoing?: boolean;
}

export type Attendee = {
    id: string;
    displayName: string;
    photoURL: string;
}

export type ChatComment = {
    id: string;
    displayName: string;
    photoURL: string;
    uid: string;
    text: string;
    date: number;
}