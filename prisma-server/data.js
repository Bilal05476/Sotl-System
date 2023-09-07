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
      departmentId: i < 15 ? 7 : 8,
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
      departmentId: i < 6 ? 7 : 8,
    });
  }

  // Create 2 Head_of_department objects
  for (let i = 1; i <= 2; i++) {
    const hashedPassword = await bcrypt.hash("12345678", 10);
    data.push({
      name: `Head_of_departmentId${i}`,
      email: `hod${i}@iqra.edu.pk`,
      password: hashedPassword,
      campus: "Main_Campus",
      role: "Head_of_Department",
      departmentId: 6 + i,
    });
  }

  return data;
}
