import connection from "../database.js";
import dotenv from "dotenv";
dotenv.config();

export const getClients = async (req, res) => {
  const pageNumber = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const offset = (pageNumber - 1) * limit;

  const limitString = limit.toString();
  const offsetString = offset.toString();
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM clients LIMIT ? OFFSET ?",
      [limitString, offsetString]
    );
    const [totalItems] = await connection.execute(
      "SELECT COUNT(*) AS total FROM clients"
    );

    const total = totalItems[0].total || 0;
    res.status(200).json({
      data: rows,
      meta: { pageNumber, limit, totalPages: Math.ceil(total / limit), total },
      message: "Clients retrieved from database successfully.",
    });
  } catch (error) {
    console.log("Error fetching clients:", error);
    res
      .status(500)
      .json({ error: true, message: "Something went wrong try again later." });
  }
};
export const getClientProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM clients WHERE client_id = ?",
      [id]
    );
    res.status(200).json({
      data: rows[0],
      message: "Client retrieved from database successfully.",
    });
  } catch (error) {
    console.log("Error fetching a client:", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};
export const addClient = async (req, res) => {
  const { name, email, phone, national_id, gender } = req.body;
  const nationalID = parseInt(national_id);
  try {
    const [response] = await connection.execute(
      `INSERT INTO clients (name, email, phone, national_id, gender)
      VALUES(?,?,?,?,?)`,
      [name, email, phone, nationalID, gender]
    );
    if (!response) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(201).json({ message: "Client was added successfully." });
  } catch (error) {
    console.log("Error adding a client: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};
export const updateClient = async (req, res) => {
  const { name, email, phone, national_id, gender } = req.body;
  const { id } = req.params;
  try {
    const response = await connection.execute(
      "UPDATE clients SET name=?, email=?, phone=?, national_id=?, gender=? WHERE client_id=?",
      [name, email, phone, national_id, gender, id]
    );
    if (!response) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(200).json({ message: "Client was updated successfully." });
  } catch (error) {
    console.log("Error updating a client: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};
export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await connection.execute(
      "DELETE FROM clients WHERE client_id=?",
      [id]
    );
    if (!response) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(200).json({ message: "Client was deleted successfully." });
  } catch (error) {
    console.log("Error deleting a client: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};

export const searchClient = async (req, res) => {
  const searchQuery = req.query.q;
  console.log(searchQuery);
  if (!searchQuery) {
    return res.status(400).json({ message: "No input was provided" });
  }
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM clients WHERE name LIKE ? ",
      [`%${searchQuery}%`]
    );
    if (rows.length === 0) {
      return res.status(200).json({ message: "No user with that name exists" });
    }
    res
      .status(200)
      .json({ data: rows, message: "Clients retrieved successfully" });
  } catch (error) {
    console.log("An error while searching", error);
    res.status(500).json({ message: "Something went wrong", error: true });
  }
};
