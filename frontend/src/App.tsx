import { useEffect, useState } from "react";
import { Button, Input } from "react-daisyui";

interface BudgetItem {
  services: string;
  qty: string;
  tax: string;
  rate: string;
  total_amount: string;
}

function App() {
  const [servicesData, setServicesData] = useState<BudgetItem[]>([]);
  const [message, setMessage] = useState("");
  const [discount, setDiscount] = useState<number>(0);

  const fetchMessage = async () => {
    const res = await fetch("/api/message");
    const text = await res.text();
    setMessage(text);
  };

  const [newService, setNewService] = useState<BudgetItem>({
    services: "",
    qty: "1",
    tax: "5%",
    rate: "1000",
    total_amount: "1000",
  });

  const handleAddService = async () => {
    try {
      const response = await fetch("http://localhost:5000/add-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      if (!response.ok) throw new Error("Failed to add service");

      const result = await response.json();

      // fetchData();
      setServicesData((prevData) => [...prevData, result.data]);

      // Reset form - necessary
      setNewService({
        services: "",
        qty: "1",
        tax: "5%",
        rate: "1000",
        total_amount: "1000",
      });
    } catch (error) {
      console.error("Add service error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-data");
      const data = await response.json();
      setServicesData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate subtotal from services data
  const subTotal = servicesData.reduce(
    (acc, item) => acc + parseFloat(item.total_amount),
    0
  );

  // Calculate total after discount
  const total = subTotal - (discount / 100) * subTotal;

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 py-4">
        <Button color="primary" onClick={fetchMessage}>
          Get Welcome Message
        </Button>
        {message && <div className="text-lg font-bold">{message}</div>}
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Budget Estimation - Services
        </h1>

        <table className="table w-full border border-gray-200">
          <thead>
            <tr>
              <th>Service</th>
              <th>QTY</th>
              <th>Tax</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {servicesData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="text-gray-200">{item.services}</td>
                <td className="text-gray-200">{item.qty}</td>
                <td className="text-gray-200">{item.tax}</td>
                <td className="text-gray-200">${item.rate}</td>
                <td className="text-gray-200">${item.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-wrap gap-8 mt-8 justify-between">
          {/* Add Service Form */}
          <div className="flex flex-col gap-2 w-full md:w-[45%]">
            <h2 className="text-xl font-semibold mb-2">Add New Service</h2>
            <Input
              placeholder="Service Name"
              value={newService.services}
              onChange={(e) =>
                setNewService({ ...newService, services: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={newService.qty}
              onChange={(e) =>
                setNewService({ ...newService, qty: e.target.value })
              }
            />
            <Input
              placeholder="Tax %"
              value={newService.tax}
              onChange={(e) =>
                setNewService({ ...newService, tax: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Rate"
              value={newService.rate}
              onChange={(e) => {
                const updatedRate = e.target.value;
                const total = (
                  parseFloat(updatedRate || "0") *
                  parseInt(newService.qty || "0")
                ).toFixed(2);
                setNewService({
                  ...newService,
                  rate: updatedRate,
                  total_amount: total,
                });
              }}
            />
            <Input
              type="number"
              placeholder="Total Amount"
              value={newService.total_amount}
              disabled
            />
            <Button color="success" onClick={handleAddService}>
              Add Service
            </Button>
          </div>

          <div className="">
            <div className="w-full">
              <label className="font-semibold">Discount (%)</label>
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                placeholder="Enter discount %"
                min={0}
                max={100}
                className="input input-bordered w-full"
              />
            </div>

            <div className="w-full">
              <label className="font-semibold">Subtotal</label>
              <Input
                type="text"
                value={`$ ${subTotal.toFixed(2)}`}
                disabled
                className="input input-bordered w-full"
              />
            </div>

            <div className="w-full">
              <label className="font-semibold">Total (after discount)</label>
              <Input
                type="text"
                value={`$ ${total.toFixed(2)}`}
                disabled
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
