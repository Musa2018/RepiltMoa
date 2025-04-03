import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // News and Announcements endpoints
  app.get("/api/news", async (_req, res) => {
    try {
      const newsItems = await storage.getAllNews();
      res.json(newsItems);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Error fetching news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const newsItem = await storage.getNewsById(Number(req.params.id));
      if (!newsItem) {
        return res.status(404).json({ message: "News item not found" });
      }
      res.json(newsItem);
    } catch (error) {
      console.error("Error fetching news item:", error);
      res.status(500).json({ message: "Error fetching news item" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const newsItem = await storage.createNews(req.body);
      res.status(201).json(newsItem);
    } catch (error) {
      console.error("Error creating news item:", error);
      res.status(500).json({ message: "Error creating news item" });
    }
  });

  app.put("/api/news/:id", async (req, res) => {
    try {
      const updatedNews = await storage.updateNews(Number(req.params.id), req.body);
      if (!updatedNews) {
        return res.status(404).json({ message: "News item not found" });
      }
      res.json(updatedNews);
    } catch (error) {
      console.error("Error updating news item:", error);
      res.status(500).json({ message: "Error updating news item" });
    }
  });

  app.delete("/api/news/:id", async (req, res) => {
    try {
      const success = await storage.deleteNews(Number(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "News item not found" });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting news item:", error);
      res.status(500).json({ message: "Error deleting news item" });
    }
  });

  // Resources endpoints
  app.get("/api/resources", async (_req, res) => {
    try {
      const resources = await storage.getAllResources();
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ message: "Error fetching resources" });
    }
  });

  app.get("/api/resources/category/:category", async (req, res) => {
    try {
      const resources = await storage.getResourcesByCategory(req.params.category);
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources by category:", error);
      res.status(500).json({ message: "Error fetching resources by category" });
    }
  });

  app.get("/api/resources/:id", async (req, res) => {
    try {
      const resource = await storage.getResourceById(Number(req.params.id));
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      console.error("Error fetching resource:", error);
      res.status(500).json({ message: "Error fetching resource" });
    }
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const resource = await storage.createResource(req.body);
      res.status(201).json(resource);
    } catch (error) {
      console.error("Error creating resource:", error);
      res.status(500).json({ message: "Error creating resource" });
    }
  });

  app.put("/api/resources/:id", async (req, res) => {
    try {
      const updatedResource = await storage.updateResource(Number(req.params.id), req.body);
      if (!updatedResource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json(updatedResource);
    } catch (error) {
      console.error("Error updating resource:", error);
      res.status(500).json({ message: "Error updating resource" });
    }
  });

  app.delete("/api/resources/:id", async (req, res) => {
    try {
      const success = await storage.deleteResource(Number(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting resource:", error);
      res.status(500).json({ message: "Error deleting resource" });
    }
  });

  // Services endpoints
  app.get("/api/services", async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Error fetching services" });
    }
  });

  app.get("/api/services/category/:category", async (req, res) => {
    try {
      const services = await storage.getServicesByCategory(req.params.category);
      res.json(services);
    } catch (error) {
      console.error("Error fetching services by category:", error);
      res.status(500).json({ message: "Error fetching services by category" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getServiceById(Number(req.params.id));
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Error fetching service" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const service = await storage.createService(req.body);
      res.status(201).json(service);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Error creating service" });
    }
  });

  app.put("/api/services/:id", async (req, res) => {
    try {
      const updatedService = await storage.updateService(Number(req.params.id), req.body);
      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(updatedService);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Error updating service" });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      const success = await storage.deleteService(Number(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Error deleting service" });
    }
  });

  // Directories endpoints
  app.get("/api/directories", async (_req, res) => {
    try {
      const directories = await storage.getAllDirectories();
      res.json(directories);
    } catch (error) {
      console.error("Error fetching directories:", error);
      res.status(500).json({ message: "Error fetching directories" });
    }
  });

  app.get("/api/directories/region/:region", async (req, res) => {
    try {
      const directories = await storage.getDirectoriesByRegion(req.params.region);
      res.json(directories);
    } catch (error) {
      console.error("Error fetching directories by region:", error);
      res.status(500).json({ message: "Error fetching directories by region" });
    }
  });

  app.get("/api/directories/:id", async (req, res) => {
    try {
      const directory = await storage.getDirectoryById(Number(req.params.id));
      if (!directory) {
        return res.status(404).json({ message: "Directory not found" });
      }
      res.json(directory);
    } catch (error) {
      console.error("Error fetching directory:", error);
      res.status(500).json({ message: "Error fetching directory" });
    }
  });

  app.post("/api/directories", async (req, res) => {
    try {
      const directory = await storage.createDirectory(req.body);
      res.status(201).json(directory);
    } catch (error) {
      console.error("Error creating directory:", error);
      res.status(500).json({ message: "Error creating directory" });
    }
  });

  app.put("/api/directories/:id", async (req, res) => {
    try {
      const updatedDirectory = await storage.updateDirectory(Number(req.params.id), req.body);
      if (!updatedDirectory) {
        return res.status(404).json({ message: "Directory not found" });
      }
      res.json(updatedDirectory);
    } catch (error) {
      console.error("Error updating directory:", error);
      res.status(500).json({ message: "Error updating directory" });
    }
  });

  app.delete("/api/directories/:id", async (req, res) => {
    try {
      const success = await storage.deleteDirectory(Number(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Directory not found" });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting directory:", error);
      res.status(500).json({ message: "Error deleting directory" });
    }
  });

  // Statistics endpoints
  app.get("/api/statistics", async (_req, res) => {
    try {
      const statistics = await storage.getAllStatistics();
      res.json(statistics);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ message: "Error fetching statistics" });
    }
  });

  app.get("/api/statistics/:id", async (req, res) => {
    try {
      const statistic = await storage.getStatisticById(Number(req.params.id));
      if (!statistic) {
        return res.status(404).json({ message: "Statistic not found" });
      }
      res.json(statistic);
    } catch (error) {
      console.error("Error fetching statistic:", error);
      res.status(500).json({ message: "Error fetching statistic" });
    }
  });

  app.post("/api/statistics", async (req, res) => {
    try {
      const statistic = await storage.createStatistic(req.body);
      res.status(201).json(statistic);
    } catch (error) {
      console.error("Error creating statistic:", error);
      res.status(500).json({ message: "Error creating statistic" });
    }
  });

  app.put("/api/statistics/:id", async (req, res) => {
    try {
      const updatedStatistic = await storage.updateStatistic(Number(req.params.id), req.body);
      if (!updatedStatistic) {
        return res.status(404).json({ message: "Statistic not found" });
      }
      res.json(updatedStatistic);
    } catch (error) {
      console.error("Error updating statistic:", error);
      res.status(500).json({ message: "Error updating statistic" });
    }
  });

  app.delete("/api/statistics/:id", async (req, res) => {
    try {
      const success = await storage.deleteStatistic(Number(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Statistic not found" });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting statistic:", error);
      res.status(500).json({ message: "Error deleting statistic" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
