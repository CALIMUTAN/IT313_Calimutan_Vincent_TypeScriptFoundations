import getStatus, { computeAverage, EnrollmentStatus } from "./gradeUtils.js";
import isPassing from "./gradeUtils.js";


interface Enrollee {
    name: string;
    prelim : number;
    midterm: number;
    final: number;
}

interface EligibilityReport{
    name: string;
    average: number;
    status: EnrollmentStatus;
    remarks?: string;
}

const enrollees : Enrollee[] = [
    { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
    { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
    { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
    { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
    { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 }
];

const getEnrollees = ():Promise<Enrollee[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 1000);
    });
};

type BatchId = string | number;

function groupBy<T> (
    items: T[],
    keyFn: (item: T) => string
): Record<string, T[]> {
    return items.reduce((groups, item) => {
        const key = keyFn(item);

        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);

        return groups;
    },{} as Record<string, T[]>);
}
 


const generateReport = async ():Promise<void> => {
    try {
        const data = await getEnrollees();

        let batchId: BatchId = "IT312-001";

        if (typeof batchId === "string"){
            console.log(`Processing batch: ${batchId}`);
        } else {
            console.log(`Processing batch: ${batchId}`);
        }

        const results: EligibilityReport[] =data.map(
            ({name, prelim, midterm, final}) =>{
            const average = computeAverage(
                prelim,
                 midterm,
                 final);
            
            const status = getStatus(average);

            return {
                name,
                average,
                status,
                ...(status === EnrollmentStatus.Probation
                    ? {remarks: "Needs Consultation"}
                    : {})
            }
        }
        );
        const grouped =groupBy(results, (report) => report.status);

        const passing = grouped[EnrollmentStatus.Passing] ?? [];

        const probation = grouped[EnrollmentStatus.Probation] ?? [];

        const totalAverage = results.reduce(
            (total, { average }) => total + average,
            0
        );

        const classAverage = totalAverage / results.length;
        const studentLines =results.map(
            ({name, average, status, remarks}) =>
                `${name} - Average: ${average.toFixed(2)} - ${status}${
                    remarks ?  ` - ${remarks}` : ""
                }`
        )
        .join("\n");

        const report = `=== IT313 Enrollment Eligibility Report (Typescript) ===
${studentLines}
Class Average: ${classAverage.toFixed(2)}
Passing: ${passing.length} / ${results.length}`;

        console.log(report);
        
    } catch (error) {
        console.log(
            "Unable to retrieve enrollee data."
        );
    }
};

generateReport();