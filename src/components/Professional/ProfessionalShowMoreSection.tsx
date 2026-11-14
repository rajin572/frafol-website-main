"use client";
import { IProfessionalUser } from '@/types';
import React from 'react';

const ProfessionalShowMoreSection = ({ professionalUser }: { professionalUser: IProfessionalUser }) => {
    const [isVisible, setIsVisible] = React.useState(false);

    // Company details, shown on demand (same fields and order as before).
    const rows = [
        { label: "Názov firmy:", value: professionalUser?.companyName },
        { label: "Adresa firmy:", value: professionalUser?.address },
        { label: "IČO:", value: professionalUser?.ico },
        { label: "DIČ:", value: professionalUser?.dic },
        { label: "E-mail firmy:", value: professionalUser?.email },
        { label: "Telefónne číslo firmy:", value: professionalUser?.phone },
        { label: "Mesto:", value: professionalUser?.town },
        { label: "PSČ:", value: professionalUser?.zipCode },
    ];

    return (
        <div className="border-t border-base-color/10 pt-8">
            <button
                type="button"
                aria-expanded={isVisible}
                onClick={() => setIsVisible((prev) => !prev)}
                className="text-gray-400 text-sm sm:text-base underline underline-offset-4 cursor-pointer transition-colors hover:text-gray-600"
            >
                Zobraziť viac informácií
            </button>
            <div className={`${isVisible ? "block" : "hidden"}`}>
                <div className="mt-3 space-y-2">
                    {rows.map(({ label, value }) => (
                        <div key={label} className="flex items-center gap-2">
                            <p className="text-gray-400 text-sm">{label}</p>
                            <p className="text-gray-500 text-sm">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 bg-error/10 p-4 rounded-lg mt-8">
                    <p className="text-error text-sm leading-relaxed">
                        Ak kontaktujete profesionála prostredníctvom uvedených kontaktných údajov a dohodnete si služby mimo platformy FRAFOL, nenesieme zodpovednosť za takto uzatvorené dohody ani prípadné vzniknuté problémy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalShowMoreSection;
