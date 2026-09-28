import {computeAverage} from "./gradeUtils.js"
import isPassing from "./gradeUtils.js"

const enrollees = [
 { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
 { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
 { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
 { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
 { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

const getEnrollees = () =>  {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
                resolve(enrollees);
        },1000);
    });
};

const generatReportDetails = async () => {
     try {
        const data = await getEnrollees();

        
        const results = data.map(({name, prelim , midterm , final }) => {
            const average = computeAverage(prelim, midterm, final);
            const status = isPassing(average) ? "PASSING" : "PROBATION";

            return {name, average, status

            };
        
     });
        const passing = results.filter(
            ({status}) => status === "PASSING"
        );

        const probation = results.filter(
            ({status}) => status === "PROBATION"
        );

        const totalAverage = results.reduce(
            (total, {average}) => total + average, 0
        );

        const classAverage = totalAverage / results.length;

        const studentLines = results
        .map(
            ({name, average, status}) =>
                `${name} - Average: ${average.toFixed(2)} - ${status}`
        )
        . join("\n");

        const report = `=== IT313 Enrollment Eligibility Report ===
        ${studentLines} 
        Class Average: ${classAverage.toFixed(2)}
        Passing: ${passing.length} / ${results.length}`;

            console.log(report);


    } catch (error) {
        console.log ("unable to retrieve enrollee data"

        );
    }
};

generatReportDetails ();