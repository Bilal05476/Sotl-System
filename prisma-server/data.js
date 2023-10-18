import bcrypt from "bcryptjs";

export async function sampleUsers() {
  const data = [];
  // Create 25 Faculty objects
  const hashedPassword = await bcrypt.hash("12345678", 10);
  for (let i = 1; i <= 25; i++) {
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

export async function sampleObservations() {
  // faculty: 3 - 27
  // observer: 28 - 37
  // hod: 38 - 39
  const data = [];
  // Create 25 Faculty objects
  for (let i = 3; i <= 15; i++) {
    data.push({
      semester: i < 10 ? "Fall" : "Spring",
      facultyId: i,
      observerId: i < 10 ? 28 : 29,
      hodId: i < 10 ? 38 : 39,
      threshold: 50,
    });
  }
  return data;
}
