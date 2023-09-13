import bcrypt from "bcryptjs";

export default async function sampleUsers() {
  const data = [];
  // Create 25 Faculty objects
  for (let i = 1; i <= 25; i++) {
    const hashedPassword = await bcrypt.hash("12345678", 10);
    data.push({
      name: `Faculty${i}`,
      email: `faculty${i}@iqra.edu.pk`,
      password: hashedPassword,
      campus: "Main_Campus",
      role: "Faculty",
      departmentId: i < 15 ? 1 : 2,
    });
  }

  // Create 10 Observer objects
  for (let i = 1; i <= 10; i++) {
    const hashedPassword = await bcrypt.hash("12345678", 10);

    data.push({
      name: `Observer${i}`,
      email: `observer${i}@iqra.edu.pk`,
      password: hashedPassword,
      campus: "Main_Campus",
      role: "Observer",
      departmentId: i < 6 ? 1 : 2,
    });
  }

  // Create 2 Head_of_department objects
  for (let i = 1; i <= 2; i++) {
    const hashedPassword = await bcrypt.hash("12345678", 10);
    data.push({
      name: `Head of Department${i}`,
      email: `hod${i}@iqra.edu.pk`,
      password: hashedPassword,
      campus: "Main_Campus",
      role: "Head_of_Department",
      departmentId: i,
    });
  }

  return data;
}
