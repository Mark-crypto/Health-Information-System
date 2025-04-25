import connection from "../database.js";

export const getReports = async (req, res) => {
  try {
    const [programData] = await connection.execute(
      `
      SELECT COUNT(*) AS total, 
      COUNT(CASE WHEN name = 'HIV' THEN 1 END) AS hiv_count, 
      COUNT(CASE WHEN name = 'malaria' THEN 1 END) AS malaria_count, 
      COUNT(CASE WHEN name = 'tuberculosis' THEN 1 END) AS tb_count 
      FROM programs
      `
    );
    const [clientData] = await connection.execute(
      "SELECT COUNT(*) AS total FROM clients"
    );
    res.status(200).json({
      data: { programData, clientData },
      message: "Reports retrieved successfully.",
    });
  } catch (error) {
    console.log("Error fetching reports from database: ", error);
    res
      .status(500)
      .json({ error: true, message: "Something went wrong. Try again later." });
  }
};
