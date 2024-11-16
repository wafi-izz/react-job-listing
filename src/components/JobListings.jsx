import JobListing from './JobListing'
import jobs from '../jobs.json';
import { useEffect, useState } from 'react';
import Spinners from './Spinners';

const JobListings = ({isHome}) => {
    const [jobs,setJobs] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=> {
        const fetchJobs = async () => {
            const apiUrl = isHome? '?_limit=3' : '';
            try{
                const res = await fetch('/api/jobs'+apiUrl);
                const data = await res.json();
                setJobs(data);
            }
            catch(error) {
                console.log('Error fetching data',error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchJobs();
    },[]);
    const jobListing = isHome ? jobs.slice(0,3) : jobs;
    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    Browse Jobs
                </h2>
                {loading? (
                    <Spinners loading={loading} />
                    ) 
                    : 
                    (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <JobListing key={job.id} job={job} />
                            ))}
                        </div>
                    )}
            </div>
        </section>
    );
};
export default JobListings;