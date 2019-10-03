export interface PersonalInformation {
    fname: string;
    lname: string;
}

export interface ContactInformation {
    address: string;
    phone: string;
}

export interface Course {
    courseId: string;
    courseName: string;
    payment: string;
}

export interface Registration {
    courses: Course[];
    personalInfo: PersonalInformation;
    contactInfo: ContactInformation;
}