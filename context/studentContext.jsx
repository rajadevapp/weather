import { createContext, useState } from "react";

export const StudentContext = createContext();

export function StudentProvider({ children }) {

    const [students, setStudents] = useState([]);

    return (
        <StudentContext.Provider value={{ students, setStudents }}>
            {children}
        </StudentContext.Provider>
    );
}