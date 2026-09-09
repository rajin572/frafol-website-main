"use client";
import Container from "./Container";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const BackToPreviousPage = () => {
    const onClick = () => {
        window.history.back();
    }
    return (
        <div onClick={onClick} className="absolute top-10 flex justify-start items-center gap-2 cursor-pointer bg-primary-color/80 rounded-xl min-w-12 text-center z-10">
            <Container>

                <MdOutlineKeyboardBackspace className="text-3xl text-secondary-color font-extrabold mx-auto" />
            </Container>
        </div>
    );
};

export default BackToPreviousPage;