import React from "react";
import ProfileSectionTitle from "./ProfileSectionTitle";
import ProfessionalReviewRating from "./ProfessionalReviewRating";
import ProfessionalReviewsFiltre from "./ProfessionalReviewsFiltre";
import ReviewCard from "./ProfessionalReviewCard";
import { IProfessionalUser, IReview } from "@/types";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import JsonLd from "@/components/seo/JsonLd";
import { reviewsSchema } from "@/lib/seo/schema";

const ProfessionalReviews = async ({
  professionalUser,
  sort,
  rating,
}: {
  professionalUser: IProfessionalUser;
  sort: string;
  rating: string;
}) => {
  const res = await fetchWithAuth(
    `/review/service-provider/${professionalUser?._id}?sort=${sort}&rating=${rating}`,
    {
      next: {
        tags: [TagTypes.prfessional],
      },
    }
  );
  const data = await res.json();
  const reviews: IReview[] = data?.data?.reviews || [];

  return (
    <section id="reviews" className="scroll-mt-24">
      {reviews.length > 0 && <JsonLd data={reviewsSchema(reviews, `/professionals/${professionalUser?._id}`)} />}
      <ProfileSectionTitle>Recenzie</ProfileSectionTitle>
      <div className="mt-6">
        <ProfessionalReviewRating professionalUser={professionalUser} />
      </div>
      <ProfessionalReviewsFiltre />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mt-6">
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ProfessionalReviews;
