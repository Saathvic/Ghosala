"use client";

import { useState } from 'react';
import { products } from "@/lib/data";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";

const chartdata = [
  {
    name: "Cow Dung Cakes",
    "Number of sales": 483,
  },
  {
    name: "Organic Ghee",
    "Number of sales": 752,
  },
  {
    name: "Panchakavya Vilakku",
    "Number of sales": 321,
  },
  {
    name: "Panchakavya Sambrani",
    "Number of sales": 254,
  },
  {
    name: "Cow Dung Basmam",
    "Number of sales": 187,
  },
  {
    name: "PANCHARATNA VASTUGAL",
    "Number of sales": 145,
  },
  {
    name: "SWARNA MAHAPERIYAVA KIT",
    "Number of sales": 264,
  },
];

export default function AnalyticsPage() {
  const [tabValue, setTabValue] = useState('overview');
  
  // Calculate some statistics from the products
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const averageRating = (products.reduce((sum, product) => sum + product.rating, 0) / products.length).toFixed(1);
  const totalSales = chartdata.reduce((sum, item) => sum + item["Number of sales"], 0);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Sales Analytics</h1>
      
      <Tabs value={tabValue} onValueChange={setTabValue} className="mb-8">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">Products in inventory</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Catalog Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹{totalValue}</div>
                <p className="text-xs text-muted-foreground">Combined product value</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalSales}</div>
                <p className="text-xs text-muted-foreground">Total units sold</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-12 h-12 object-contain mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${Math.floor(Math.random() * 60) + 40}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-4 text-gray-700 font-medium">
                        {Math.floor(Math.random() * 500) + 100} sold
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  Average rating: {averageRating}/5.0
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.reviewCount} reviews</div>
                      </div>
                      <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i} className={`text-lg ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                        <span className="ml-2 text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sales by Product</CardTitle>
              <CardDescription>
                Units sold for each product
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center w-full">
                {chartdata.map((item) => (
                  <div key={item.name} className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm font-medium">{item["Number of sales"]}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(item["Number of sales"] / 800) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>
                Current stock levels for products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.category}</div>
                    </div>
                    <div className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Pricing</CardTitle>
              <CardDescription>
                Current pricing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between border-b pb-2">
                    <div className="font-medium">{product.name}</div>
                    <div className="flex items-center">
                      {product.originalPrice ? (
                        <span className="text-sm line-through text-muted-foreground mr-2">₹{product.originalPrice}</span>
                      ) : null}
                      <span className="text-sm font-bold">₹{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
