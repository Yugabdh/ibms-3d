// Central registry of Cloudinary images. `src` is the path after
// https://res.cloudinary.com/tnmhyk4e/image/upload/ (keep the version segment).
// Resizing and format are handled by app/lib/cloudinary-loader.js.

export const images = {
  officeLevel4: {
    src: "v1794318682/Approval_Sample_8.png",
    alt: "3D floor plan of an office level rendered from AutoCAD drawings, showing workstations, meeting rooms and cores",
    width: 1456,
    height: 840,
  },
  batteryRoom: {
    src: "v1794319945/Battery_room_3.jpg",
    alt: "3D view of a battery room with battery cabinets, racks and overhead services",
  },
  upsRoom: {
    src: "v1794319961/UPS_Room_2-_4_-_Photo.jpg",
    alt: "3D view of a UPS room with a UPS cabinet beside a line of electrical panels",
  },
  electricalRoom: {
    src: "v1794318785/ElectricalRoom_Updates-1-_6_-_Photo.jpg",
    alt: "3D view of an electrical panel room with a long line of switchboard panels",
  },
  floorPlan: {
    src: "v1794318682/Approval_Sample_8.png",
    alt: "3D floor plan of an office level showing rooms, workstations and circulation",
  },
  airHandlingUnit: {
    src: "v1794319786/CSU_0.jpg",
    alt: "Cutaway 3D model of an air handling unit showing filters, coil piping and fan",
  },
  buildingExterior: {
    src: "v1794319818/Render5_2_-_Photo.jpg",
    alt: "Aerial 3D render of the building exterior and its landscaped grounds",
  },
  buildingContext: {
    src: "v1794319844/Final_Render_8_-_Photo.jpg",
    alt: "Aerial 3D render of the building within its surrounding campus and road network",
  },
  dashboard: {
    src: "v1794319925/Dashboard_1.jpg",
    alt: "Building operations dashboard showing water storage, consumption and quality metrics",
  },
};

// Default image for each <Illustration variant="…" />.
export const variantImages = {
  room: images.batteryRoom,
  electrical: images.electricalRoom,
  floorplan: images.floorPlan,
  hvac: images.airHandlingUnit,
  campus: images.buildingContext,
  dashboard: images.dashboard,
};
