import connection from "../database.js";

//remember pagination and search
export const getClients = async (req, res) => {
  const { _limit } = req.query;
  const { _page } = req.query;

  const page = 1;
  const limit = 10;
  const offset = 0;

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM clients LIMIT 10",
      []
    );
    res.status(200).json({
      data: rows,
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
  try {
    const response = await connection.execute(
      "INSERT INTO clients SET name=? email=? phone=? national_id=? gender=?",
      [name, email, phone, national_id, gender]
    );
    if (!response) {
      res.status(500).json({
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
      "UPDATE clients SET name=? email=? phone=? national_id=? gender=? WHERE client_id=?",
      [name, email, phone, national_id, gender, id]
    );
    if (!response) {
      res.status(500).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(201).json({ message: "Client was updated successfully." });
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
      "DELETE FROM clients WHERE client_id=",
      [id]
    );
    if (!response) {
      res.status(500).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(201).json({ message: "Client was deleted successfully." });
  } catch (error) {
    console.log("Error deleting a client: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};

export const searchClient = (req, res) => {
  const { q } = req.query;
};
