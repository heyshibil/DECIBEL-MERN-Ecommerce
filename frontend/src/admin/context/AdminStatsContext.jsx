import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../../services/api";

const AdminStatsContext = createContext();

export const AdminStatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    users: [],
    orders: [],
    products: [],
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        api.get("/users"),
        api.get("/products"),
        api.get("/orders/all"),
      ]);

      const usersData = usersRes.data || [];
      const productsData = productsRes.data || [];
      const ordersData = ordersRes.data || [];

      const revenue = ordersData.reduce(
        (sum, item) => sum + Number(item.amount?.total) || 0,
        0,
      );

      setStats({
        users: usersData,
        orders: ordersData,
        products: productsData,
        totalUsers: usersData.length,
        totalProducts: productsData.length,
        totalOrders: ordersData.length,
        revenue: revenue.toFixed(2),
      });
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // load stats initial render
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <AdminStatsContext.Provider
      value={{ loading, stats, setStats, refreshStats: loadStats }}
    >
      {children}
    </AdminStatsContext.Provider>
  );
};

export const useAdminStats = () => useContext(AdminStatsContext);
