"use client";
import React, { useState, useEffect } from 'react'
import LineChart from '../charts/LineChart'

const AdminDashboard = () => {
    const [password, setPassword] = useState<string>('');
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (password === '1234') {
            localStorage.setItem('password', password);
            setIsAuthorized(true);
        }
    };

    useEffect(() => {
        const storedPassword = localStorage.getItem('password');
        if (storedPassword && storedPassword === '1234') {
            setIsAuthorized(true);
        }
    }, []);
    if (isAuthorized){
        return (
            <div className="mx-auto w-full max-w-[1000px]">
                <LineChart />
            </div>
        )
}else{
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center py-8">
		<input
			type="password"
			placeholder="Enter password"
			className="border rounded-md p-2 mb-2 min-w-64"
			value={password}
            onChange={(e:any)=>{
                setPassword(e.target.value)
            }}
		/>
		<button type="submit" className="bg-blue-500 text-white p-2 rounded-md min-w-64">Submit</button>
	</form>
    )
}
}
export default AdminDashboard