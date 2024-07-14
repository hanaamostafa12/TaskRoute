import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
       <img className="w-100" src="Images/port2.png"  onClick={handleShow}  alt="" srcset=""/>
       <div className="col-md-4">
        <div className =" item-portfolio overflow-hidden rounded-2 cursor-pointer">
                    <img className="w-100" src="Images/port2.png"  alt="" srcset=""/>
                    <div class="item-layer  d-flex align-items-center justify-content-center ">
                    <i class="fa-solid fa-plus text-white "></i>
                    </div>
           </div>

        </div>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> <img className="w-100" src="Images/port2.png"  alt="" srcset=""/></Modal.Body>

      </Modal>
    </>
  );
}

export default Example;