import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Define the type for your item object (adjust as needed)
type ItemType = {
  id: number;
  number: number;
  name: string;
  category: string;
  serialNumber: string;
  quantity: string;
  units: string;
  description: string;
};

interface ModalsProps {
  onAddItem: (item: ItemType) => void;
}

function Modals({ onAddItem }: ModalsProps) {
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // State variables to store form input values
  const [itemType, setItemType] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [units, setUnits] = useState("");
  const [description, setDescription] = useState("");

  // Function to generate a random 9-digit serial number
  const generateSerialNumber = () => {
    return Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0");
  };

  const [itemId, setItemId] = useState(1); // Initialize with 1
  const [itemNumber, setItemNumber] = useState(1); // Initialize with 1

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const serialNumber = generateSerialNumber();

    const newItem: ItemType = {
      id: itemId,
      number: itemNumber,
      name: itemName,
      category: itemType,
      serialNumber: serialNumber,
      quantity: quantity,
      units: units,
      description: description,
    };

    onAddItem(newItem);

    // Increment the item ID and item number for the next item
    setItemId(itemId + 1);
    setItemNumber(itemNumber + 1);

    // Clear the form inputs
    setItemType("");
    setItemName("");
    setQuantity("");
    setUnits("");
    setDescription("");

    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    // Optionally, you can reset the form or perform other actions here
  };

  return (
    <>
      {/* Add Inventory Item Button */}
      <button
        type="button"
        className="btn btn-primary btn-sm fw-semibold"
        onClick={handleShow}
      >
        Add Inventory Item
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Inventory Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.Select">
              <Form.Label>Select Item Type:</Form.Label>
              <Form.Select
                aria-label="Default select example1"
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
              >
                <option>Item Type</option>
                <option value="Laptop">Laptop</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Tablet">Tablet</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className="mb-3"
                controlId="exampleForm.Select2"
              >
                <Form.Label>Units:</Form.Label>
                <Form.Select
                  aria-label="Default select example2"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                >
                  <option>units</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;
