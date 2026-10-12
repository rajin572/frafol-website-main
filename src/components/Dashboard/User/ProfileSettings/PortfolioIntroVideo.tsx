import ReuseButton from '@/components/ui/Button/ReuseButton';
import ProfileProtfolioUploadImageModal from '@/components/ui/Modal/Profile/ProfileProtfolioUploadImageModal';
import { IProfile } from '@/types';
import React, { useState } from 'react';
import GalleryVideoPlayer from '@/components/shared/GalleryVideoPlayer';
import useVideoThumbnails from '@/hook/useVideoThumbnails';
import { MdDelete } from 'react-icons/md';
import DeleteModal from '@/components/ui/Modal/DeleteModal';
import { deleteIntroVideo } from '@/services/ProfileService/ProfileServiceApi';
import tryCatchWrapper from '@/utils/tryCatchWrapper';

const PortfolioIntroVideo = ({ myData }: { myData: IProfile }) => {
    const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const videoThumbnails = useVideoThumbnails([myData?.introVideo]);

    const showUploadModal = () => {
        setIsUploadModalVisible(true);
    };

    const handleCancel = () => {
        setIsUploadModalVisible(false);
        setIsDeleteModalVisible(false);
    };

    const handleDelete = async () => {
        const res = await tryCatchWrapper(
            deleteIntroVideo,
            {},
            {
                toastLoadingMessage: "Odstraňuje sa úvodné video...",
                toastSuccessMessage: "Úvodné video bolo úspešne odstránené!",
                toastErrorMessage: "Niečo sa pokazilo! Skúste to prosím znova.",
            }
        );

        if (res?.success) {
            handleCancel();
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 mb-10">
                <div>
                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1.5">Úvodné video</h2>
                    <p className="text-sm sm:text-base lg:text-lg text-base-color/80 font-medium">Úvodné video je prvá vec, ktorú klient uvidí pri vyhľadávaní fotografov a kameramanov. Môžete v ňom krátko predstaviť seba a svoje služby alebo ukázať to najlepšie zo svojej tvorby.</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    <ReuseButton
                        variant="secondary"
                        className="!w-fit"
                        onClick={showUploadModal}
                    >
                        Nahrať nové video
                    </ReuseButton>
                </div>
            </div>
            <div>

                {myData?.introVideo && (
                    <div className="relative w-full max-w-[768px]">
                        <GalleryVideoPlayer
                            src={myData.introVideo}
                            poster={videoThumbnails[myData.introVideo]}
                            wrapperClassName="max-w-[768px] aspect-video bg-gray-200 rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={() => setIsDeleteModalVisible(true)}
                            title="Odstrániť video"
                            aria-label="Odstrániť video"
                            className="absolute top-2 right-2 z-10 flex items-center p-1 bg-secondary-color rounded-full cursor-pointer"
                        >
                            <MdDelete className="text-2xl text-primary-color" />
                        </button>
                    </div>
                )}

            </div>

            <ProfileProtfolioUploadImageModal
                isModalVisible={isUploadModalVisible}
                handleCancel={handleCancel}
                type="video"
            />
            <DeleteModal
                isDeleteModalVisible={isDeleteModalVisible}
                handleCancel={handleCancel}
                currentRecord={myData?.introVideo}
                handleDelete={handleDelete}
                description="Naozaj chcete odstrániť úvodné video?"
            />
        </div>
    );
};

export default PortfolioIntroVideo;