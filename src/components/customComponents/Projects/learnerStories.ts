// Learner success story images (Cloudinary). Each image is a complete 1024x1024
// placement card that already shows the learner's name, college, role and company.
// Note: file names do not always match the person on the card, so names are
// intentionally NOT derived from the URLs. Keep the order as provided.

export const LEARNER_IMAGE_SIZE = 1024; // all images are square 1024x1024

export const learnerStoryImages: string[] = [
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648877/Aditya_Joshi_ae1jxk.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648877/Kishan_Ray_copy_2_knxvuj.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648877/Abhishek_Sanap_lg8gok.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648877/Kishan_Ray_copy_3_arfsa1.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648877/Akansh_hnwrml.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648878/Kishan_Ray_copy_4_eh8eqv.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648877/Akshansh_zhtwcj.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648878/Aman_copy_3_bfzfaa.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648878/Aman_kg3hfk.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648878/Aman_copy_2_eoj8tn.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648878/Aman_copy_db71il.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648879/Arpit_Jindal_akclyn.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648879/Kishan_Ray_copy_mdvagf.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648879/Kuldeep_Kumawat_copy_qoztnu.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648879/Archishman_weueqx.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648879/Kuldeep_Kumawat_zrsjz1.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648879/Kishan_Ray_bqzrxn.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648880/Mohak_Gund_iskox5.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648879/manan_weuoi8.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648884/Mona_Chawala_lufctn.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648880/Mohit_Vyas_wdxanl.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648886/Sushil-1_kwbysu.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648885/Nischay_nn0ori.png",
  "https://res.cloudinary.com/dgin6wumo/image/upload/v1794648886/Rahul_eeoub3.png",
];

// Cloudinary delivery transformation for grid thumbnails: modern format, auto
// quality, scaled down only (c_limit never crops). The original file is untouched
// and is what the lightbox shows.
export const cloudinaryThumb = (url: string, width: number) =>
  url.replace("/image/upload/", `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
