import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function OrderDetails() {
  const { id } = useParams(); // Get order ID from the route
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
     const res = await axiosClient.get(`/orders/details/${id}`);

      setOrder(res.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCancel = async () => {
    try {
      await axiosClient.post(`/orders/cancel/${id}`);
      fetchData(); // Refresh after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handleAccept = async () => {
    try {
      await axiosClient.post(`/orders/accept/${id}`);
      fetchData(); // Refresh after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

if (!order) return <div className="p-4">Chargement...</div>;

return (
    <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Détails de la commande - #{order.id}</h2>

        <div className="mb-6 space-y-2">
            <div><strong>Date :</strong> {new Date(order.created_at).toLocaleString("fr-FR")}</div>
            <div><strong>Statut :</strong> 
                <Badge className="ml-2" variant={
                    order.status === "completed" ? "success" :
                    order.status === "processing" ? "info" :
                    order.status === "cancelled" ? "destructive" : "warning"
                }>
                    {order.status === "pending" && "En attente"}
                    {order.status === "completed" && "Terminée"}
                    {order.status === "processing" && "En cours"}
                    {order.status === "cancelled" && "Annulée"}
                    {!["pending", "completed", "processing", "cancelled"].includes(order.status) && order.status}
                </Badge>
            </div>
            <div><strong>Total :</strong> {parseFloat(order.totalAmount).toFixed(2)} €</div>
        </div>

        {/* Infos utilisateur */}
        {order.user && (
            <div className="mb-6 border p-4 rounded-md bg-muted">
                <h3 className="font-semibold text-lg mb-2">Informations du client</h3>
                <p><strong>Nom :</strong> {order.user.name}</p>
                <p><strong>Email :</strong> {order.user.email}</p>
            </div>
        )}

        {/* Tableau des articles */}
        <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Articles commandés</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Quantité</TableHead>
                        <TableHead className="text-right">Prix unitaire</TableHead>
                        <TableHead className="text-right">Sous-total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {order.order_items?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.product?.name || "Produit inconnu"}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="text-right">{parseFloat(item.unitPrice).toFixed(2)} €</TableCell>
                            <TableCell className="text-right">
                                {(item.quantity * item.unitPrice).toFixed(2)} €
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

        {/* Boutons d'action */}
        {order?.status === "pending" && 
        <div className="flex gap-4">
            <Button variant="destructive" onClick={handleCancel}>Annuler</Button>
            <Button variant="success" onClick={handleAccept}>Accepter</Button>
        </div>
        }
    </div>
);
}
