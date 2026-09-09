/* eslint-disable @typescript-eslint/no-explicit-any */
import ReuseButton from '@/components/ui/Button/ReuseButton';
import { updateGallery } from '@/services/ProfileService/ProfileServiceApi';
import tryCatchWrapper from '@/utils/tryCatchWrapper';
import React, { useMemo, useState, useRef } from 'react';
import { Image as AntdImage } from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { AllImages } from "../../../../../public/assets/AllImages";
import { MdDelete } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import DeleteModal from "@/components/ui/Modal/DeleteModal";
import { getServerUrl } from "@/helpers/config/envConfig";
import ProfileProtfolioUploadImageModal from "@/components/ui/Modal/Profile/ProfileProtfolioUploadImageModal";
import { IProfile } from '@/types';


const PortfolioGalleryImage = ({ myData }: { myData: IProfile }) => {
    const serverUrl = getServerUrl();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<any>(null);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        images: true,
        videos: true
    });
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);


    // Filter gallery items into images and videos
    const { galleryImages, galleryVideos } = useMemo(() => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', ".avif", ".tiff", ".heic", ".ico"];
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];


        const images = myData?.gallery?.filter((item) =>
            imageExtensions.some((ext) => item.toLowerCase().endsWith(ext))
        ) || [];


        const videos = myData?.gallery?.filter((item) =>
            videoExtensions.some((ext) => item.toLowerCase().endsWith(ext))
        ) || [];


        return { galleryImages: images, galleryVideos: videos };
    }, [myData?.gallery]);


    const showUploadModal = () => {
        setIsUploadModalVisible(true);
    };


    const showDeleteModal = (record: string) => {
        setIsDeleteModalVisible(true);
        setCurrentRecord(record);
    };


    const handleCancel = () => {
        setIsDeleteModalVisible(false);
        setIsUploadModalVisible(false);
        setCurrentRecord(null);
    };


    const toggleSection = (section: string) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };


    const columnsCountBreakPoints = { 350: 1, 600: 2, 1024: 3, 1440: 4 };


    const handleDelete = async (record: string) => {
        const formData = new FormData();


        formData.append(
            "data",
            JSON.stringify({
                deleteGallery: [record],
            })
        );


        const res = await tryCatchWrapper(
            updateGallery,
            { body: formData },
            {
                toastLoadingMessage: "Deleting...",
                toastSuccessMessage: "Gallery updated successfully!",
                toastErrorMessage: "Something went wrong! Please try again.",
            }
        );


        if (res?.success) {
            handleCancel();
        }
    };


    // Pause all other videos when one starts playing
    const handleVideoPlay = (currentIndex: number) => {
        videoRefs.current.forEach((video, index) => {
            if (video && index !== currentIndex && !video.paused) {
                video.pause();
            }
        });
    };


    return (
        <div>
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1.5">Gallery</h2>
                    <p className="text-sm sm:text-base lg:text-lg text-base-color/80 font-medium">
                        Show your strongest work first. Consistent crops look premium.
                    </p>
                </div>
                <ReuseButton
                    variant="secondary"
                    className="!w-fit"
                    onClick={showUploadModal}
                >
                    Upload New Photo/Video
                </ReuseButton>
            </div>


            <div className="space-y-4">
                {/* Images Section */}
                {galleryImages.length > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => toggleSection('images')}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                                Images ({galleryImages.length})
                            </h3>
                            <FiChevronDown
                                className={`text-2xl transition-transform duration-300 ${openSections.images ? 'transform rotate-180' : ''
                                    }`}
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openSections.images ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="p-6 pt-10">
                                <AntdImage.PreviewGroup>
                                    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
                                        <Masonry gutter="10px">
                                            {galleryImages?.map((item, index) => (
                                                <div key={index} className="relative group w-full">
                                                    <AntdImage
                                                        src={serverUrl + item || AllImages?.dummyCover?.src}
                                                        alt={`gallery image ${index + 1}`}
                                                        className="w-full h-full object-cover rounded-lg"
                                                        fetchPriority='high'
                                                    />
                                                    <div className="flex items-center justify-end gap-2 absolute top-2 w-full px-2">
                                                        <div
                                                            onClick={() => showDeleteModal(item)}
                                                            className="flex items-center p-1 bg-secondary-color rounded-full cursor-pointer"
                                                        >
                                                            <MdDelete className="text-2xl text-primary-color" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Masonry>
                                    </ResponsiveMasonry>
                                </AntdImage.PreviewGroup>
                            </div>
                        </div>
                    </div>
                )}


                {/* Videos Section */}
                {galleryVideos.length > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => toggleSection('videos')}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                                Videos ({galleryVideos.length})
                            </h3>
                            <FiChevronDown
                                className={`text-2xl transition-transform duration-300 ${openSections.videos ? 'transform rotate-180' : ''
                                    }`}
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openSections.videos ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="p-6 pt-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {galleryVideos.map((item, index) => (
                                        <div key={index} className="relative group w-full">
                                            <video
                                                ref={(el) => {
                                                    if (el) {
                                                        videoRefs.current[index] = el;
                                                    }
                                                }}
                                                src={serverUrl + item}
                                                controls
                                                className="w-full h-full object-cover rounded-lg"
                                                preload="metadata"
                                                onPlay={() => handleVideoPlay(index)}
                                                controlsList="nodownload noplaybackrate"

                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                            <div className="flex items-center justify-end gap-2 absolute top-2 w-full px-2">
                                                <div
                                                    onClick={() => showDeleteModal(item)}
                                                    className="flex items-center p-1 bg-secondary-color rounded-full cursor-pointer"
                                                >
                                                    <MdDelete className="text-2xl text-primary-color" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <DeleteModal
                handleDelete={handleDelete}
                currentRecord={currentRecord}
                isDeleteModalVisible={isDeleteModalVisible}
                handleCancel={handleCancel}
            />
            <ProfileProtfolioUploadImageModal
                isModalVisible={isUploadModalVisible}
                handleCancel={handleCancel}
                type="both"
            />
        </div>
    );
};


export default PortfolioGalleryImage;
