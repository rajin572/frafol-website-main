"use client";
import { IProfessionalUser } from '@/types';
import React from 'react';

const ProfessionalShowMoreSection = ({ professionalUser }: { professionalUser: IProfessionalUser }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    console.log(professionalUser)
    return (
        <div className="text-gray-300 mt-20">
            <h4 onClick={() => setIsVisible((prev) => !prev)} className="text-gray-400 text-sm sm:text-base lg:text-lg underline cursor-pointer!">
                Zobraziť viac informácií
            </h4>
            <div className={`${isVisible ? "block" : "hidden"}`}>
                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">Názov firmy:</p>
                    <p className="text-gray-400 text-sm">
                        {professionalUser?.companyName}
                    </p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">Adresa firmy:</p>
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
                    <p className="text-gray-400 text-sm">E-mail firmy:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.email}</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">Telefónne číslo firmy:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.phone}</p>
                </div>

                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">Mesto:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.town}</p>
                </div>

                <div className="mt-2 flex items-center gap-2">
                    <p className="text-gray-400 text-sm">PSČ:</p>
                    <p className="text-gray-400 text-sm">{professionalUser?.zipCode}</p>
                </div>

                <div className="flex items-center gap-2 bg-error/20 p-3 rounded-lg mt-10">
                    <p className="text-error text-sm">
                        Ak kontaktujete profesionála prostredníctvom uvedených kontaktných údajov a dohodnete si služby mimo platformy FRAFOL, nenesieme zodpovednosť za takto uzatvorené dohody ani prípadné vzniknuté problémy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalShowMoreSection;