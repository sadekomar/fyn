import { readFileSync, writeFileSync } from "fs";
// trigger redeploy
type InstagramProfile = {
  biography: string;
  businessCategoryName: string | null;
  externalUrl: string;
  externalUrls: {
    title: string;
    lynx_url: string;
    url: string;
    link_type: string;
  }[];
  followersCount: number;
  followsCount: number;
  fullName: string;
  id: string;
  inputUrl: string;
  isBusinessAccount: boolean;
  postsCount: number;
  profilePicUrlHD: string;
  relatedProfiles: {
    id: string;
    full_name: string;
    is_private: boolean;
    is_verified: boolean;
    profile_pic_url: string;
    username: string;
  }[];
  username: string;
  verified: boolean;
};

//username, verified?, followersCount?, followsCount?, profilePicUrl?, businessCategoryName?, fullName?, isBusinessAccount?, postsCount?

const jsonFilePath = "./large-data.json"; // Change path to your JSON file

// Function to escape CSV values
function escapeCsvValue(value: any): string {
  if (value === null || value === undefined) {
    return "";
  }
  const stringValue = String(value);
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

try {
  const data = readFileSync(jsonFilePath, "utf-8");
  const jsonData = JSON.parse(data) as InstagramProfile[];

  // CSV headers
  const headers = [
    "username",
    "verified",
    "followersCount",
    "followsCount",
    "profilePicUrl",
    "businessCategoryName",
    "fullName",
    "isBusinessAccount",
    "postsCount",
    "url",
  ];

  let csvContent = headers.join(",") + "\n";

  jsonData.forEach((profile) => {
    // Add the main profile row
    const mainProfileRow = [
      escapeCsvValue(profile.username),
      escapeCsvValue(profile.verified),
      escapeCsvValue(profile.followersCount),
      escapeCsvValue(profile.followsCount),
      escapeCsvValue(profile.profilePicUrlHD),
      escapeCsvValue(profile.businessCategoryName),
      escapeCsvValue(profile.fullName),
      escapeCsvValue(profile.isBusinessAccount),
      escapeCsvValue(profile.postsCount),
      escapeCsvValue(profile.externalUrl),
      escapeCsvValue(profile.biography),
    ];
    csvContent += mainProfileRow.join(",") + "\n";

    // Add rows for each related profile
    // if (profile.relatedProfiles && profile.relatedProfiles.length > 0) {
    //   profile.relatedProfiles.forEach((relatedProfile) => {
    //     const relatedProfileRow = [
    //       escapeCsvValue(relatedProfile.username),
    //       escapeCsvValue(relatedProfile.is_verified),
    //       "", // followersCount - empty for related profiles
    //       "", // followsCount - empty for related profiles
    //       escapeCsvValue(relatedProfile.profile_pic_url),
    //       "", // businessCategoryName - empty for related profiles
    //       escapeCsvValue(relatedProfile.full_name),
    //       "", // isBusinessAccount - empty for related profiles
    //       "", // postsCount - empty for related profiles
    //       "", // url - empty for related profiles
    //     ];
    //     csvContent += relatedProfileRow.join(",") + "\n";
    //   });
    // }
  });

  // Write CSV file
  writeFileSync("./instagram_profiles_large.csv", csvContent, "utf-8");
  console.log("CSV file created successfully: instagram_profiles_large.csv");
  console.log(`Total profiles processed: ${jsonData.length}`);
} catch (err) {
  console.error("Error reading or parsing JSON file:", err);
}
