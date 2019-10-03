export interface PersonalInformation {
    fname: string;
    lname: string;
}

export interface ContactInformation {
    address: string;
    phone: string;
}

export interface course {
    courseId: string;
    courseName: string;
    payment: string;
}

export interface Registration {
    courses: course[];
    personalInfo: PersonalInformation;
    contactInfo: ContactInformation;
}