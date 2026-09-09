"use client";
import { IProfessionalUser } from '@/types';
import React from 'react';

const ProfessionalShowMoreSection = ({ professionalUser }: { professionalUser: IProfessionalUser }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    console.log(professionalUser)
    return (
        <div className="text-gray-300 mt-20">
            <h4 onClick={() => setIsVisible((prev) => !prev)} className="text-gray-400 text-sm sm:text-base lg:text-lg underline cursor-pointer!">
                Show More Information
            </h4>
            <div className={`${isVisible ? "block" : "hidden"}`}>
                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">Company name:</p>
                    <p className="text-gray-400 text-sm">
                        {professionalUser?.companyName}
                    </p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">Company adress:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.address}</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">IČO:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.ico}</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">DIČ:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.dic}</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">Company email:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.email}</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">Company Phone Number:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.phone}</p>
                </div>

                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">Company Town:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.town}</p>
                </div>

                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">Company Zip Code:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.zipCode}</p>
                </div>

                <div className="flex items-center gap-2 bg-error/20 p-3 rounded-lg mt-10">
                    <p className="text-error text-sm">
                        If you use those information and contract professional through our
                        website we will not be responsible for any offenses
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalShowMoreSection;