/* eslint-disable @typescript-eslint/no-explicit-any */
import ReuseButton from '@/components/ui/Button/ReuseButton';
import DeleteModal from '@/components/ui/Modal/DeleteModal';
import ProfileProtfolioUploadImageModal from '@/components/ui/Modal/Profile/ProfileProtfolioUploadImageModal';
import { getServerUrl } from '@/helpers/config/envConfig';
import { updateBannerImage } from '@/services/ProfileService/ProfileServiceApi';
import tryCatchWrapper from '@/utils/tryCatchWrapper';
import React, { useState } from 'react';
import { Image as AntdImage } from "antd";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { AllImages } from '../../../../../public/assets/AllImages';
import { MdDelete } from 'react-icons/md';
import { IProfile } from '@/types';

const PortfolioBannerImage = ({ myData }: { myData: IProfile }) => {

    const serverUrl = getServerUrl();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<any>(null);

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

    const columnsCountBreakPoints = { 350: 1, 600: 2, 1024: 3, 1440: 4 };

    const handleDelete = async (record: string) => {
        const formData = new FormData();
        console.log(record)
        formData.append(
            "data",
            JSON.stringify({
                deleteGallery: [record],
            })
        );

        const res = await tryCatchWrapper(
            updateBannerImage,
            { body: formData },
            {
                toastLoadingMessage: "Deleting Image...",
                toastSuccessMessage: "Gallery updated successfully!",
                toastErrorMessage: "Something went wrong! Please try again.",
            }
        );

        if (res?.success) {
            handleCancel();
        }
    };

    console.log(myData?.bannerImages)

    return (
        <div>
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1.5">Portfolio Banner</h2>
                    <p className="text-sm sm:text-base lg:text-lg text-base-color/80 font-medium">Your identity headline. Keep it bold and simple.</p>
                </div>
                <ReuseButton
                    variant="secondary"
                    className="!w-fit"
                    onClick={showUploadModal}
                >
                    Upload New Photo
                </ReuseButton>
            </div>
            <div>
                <AntdImage.PreviewGroup>
                    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
                        <Masonry gutter="10px">
                            {myData?.bannerImages?.map((item, index) => (
                                <div key={index} className="relative group w-full ">
                                    <AntdImage
                                        src={serverUrl + item || AllImages?.dummyCover?.src}
                                        alt={"gallery Image"}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="flex items-center justify-end gap-2 absolute top-2  w-full px-2">
                                        <div
                                            onClick={() => showDeleteModal(item)}
                                            className="flex items-center p-1 bg-secondary-color rounded-full"
                                        >
                                            <MdDelete className="text-2xl text-primary-color cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </AntdImage.PreviewGroup>
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
                type="banner"
            />
        </div>
    );
};

export default PortfolioBannerImage;