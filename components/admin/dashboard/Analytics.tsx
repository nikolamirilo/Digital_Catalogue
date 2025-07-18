"use client";
import React from 'react'
import LineChart from '../../charts/LineChart'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
// import { Badge } from "../../ui/badge";
// import { Separator } from "../../ui/separator";
import { FiTrendingUp, FiUsers, FiCalendar, FiBarChart} from 'react-icons/fi';
// import { FiGlobe, FiMonitor, FiChrome } from 'react-icons/fi';

interface AnalyticsProps {
  data: { date: string; count: number }[];
  rawEvents: any[];
}

const Analytics = ({ data, rawEvents }: AnalyticsProps) => {
  // Total page views
  const totalPageViews = rawEvents.length;
  // Unique visitors
  const uniqueVisitors = new Set(rawEvents.map(e => e.properties?.distinct_id || e.distinct_id)).size;
  // Most popular day
  const mostPopularDay = data.reduce((max, d) => Number(d.count) > Number(max.count) ? d : max, { date: '', count: 0 });
  // Average page views per day
  const avgPageViews = data.length > 0 ? (totalPageViews / data.length).toFixed(2) : '0';
  // Top browsers
  // const browserCounts = rawEvents.reduce((acc, e) => {
  //   const browser = e.properties?.$browser;
  //   if (browser) acc[browser] = (acc[browser] || 0) + 1;
  //   return acc;
  // }, {} as Record<string, number>);
  // const topBrowsers = Object.entries(browserCounts).map(([browser, count]) => [browser, Number(count)]).sort((a, b) => Number(b[1]) - Number(a[1]));
  // // Top devices
  // const deviceCounts = rawEvents.reduce((acc, e) => {
  //   const device = e.properties?.$device_type;
  //   if (device) acc[device] = (acc[device] || 0) + 1;
  //   return acc;
  // }, {} as Record<string, number>);

  // // Top countries
  // const countryCounts = rawEvents.reduce((acc, e) => {
  //   const country = e.properties?.$geoip_country_name;
  //   if (country) acc[country] = (acc[country] || 0) + 1;
  //   return acc;
  // }, {} as Record<string, number>);
  // const topCountries = Object.entries(countryCounts).map(([country, count]) => [country, Number(count)]).sort((a, b) => Number(b[1]) - Number(a[1]));

  // const topDevices = Object.entries(deviceCounts).map(([device, count]) => [device, Number(count)]).sort((a, b) => Number(b[1]) - Number(a[1]));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="px-2 max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-product-foreground flex items-center justify-center gap-2">
          <FiBarChart className="w-8 h-8 text-product-primary" />
          Analytics Dashboard
        </h1>
        <p className="text-product-foreground-accent text-lg">
          Comprehensive insights and performance metrics for your restaurant
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid w-full mx-auto grid-cols-1 md:w-full md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card className="bg-gradient-to-br from-product-background to-hero-product-background border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-300 hover:scale-product-hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-product-foreground-accent text-sm font-medium">Total Page Views</p>
                <p className="text-3xl font-bold text-product-foreground mt-1">{totalPageViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-product-primary/10 rounded-full flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-product-icon" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-product-background to-hero-product-background border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-300 hover:scale-product-hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-product-foreground-accent text-sm font-medium">Unique Visitors</p>
                <p className="text-3xl font-bold text-product-foreground mt-1">{uniqueVisitors.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-product-secondary/10 rounded-full flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-product-icon" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-product-background to-hero-product-background border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-300 hover:scale-product-hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-product-foreground-accent text-sm font-medium">Most Popular Day</p>
                <p className="text-lg font-bold text-product-foreground mt-1">
                  {mostPopularDay && mostPopularDay.date ? formatDate(mostPopularDay.date) : '-'}
                </p>
                {mostPopularDay && mostPopularDay.count > 0 && (
                  <p className="text-xs text-product-foreground-accent mt-1">
                    {mostPopularDay.count} views
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-product-primary-accent/10 rounded-full flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-product-icon" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-product-background to-hero-product-background border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-300 hover:scale-product-hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-product-foreground-accent text-sm font-medium">Avg. Views/Day</p>
                <p className="text-3xl font-bold text-product-foreground mt-1">{avgPageViews}</p>
              </div>
              <div className="w-12 h-12 bg-product-icon/10 rounded-full flex items-center justify-center">
                <FiBarChart className="w-6 h-6 text-product-icon" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="bg-gradient-to-br from-product-background to-hero-product-background border-product-border shadow-product-shadow">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-product-foreground">Traffic Overview</CardTitle>
          <CardDescription className="text-product-foreground-accent">
            Daily page views over time
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-fit">
            <LineChart data={data} />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-product-background to-hero-product-background border-product-border shadow-product-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-product-foreground flex items-center gap-2">
              <FiChrome className="w-5 h-5 text-product-primary" />
              Top Browsers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topBrowsers.slice(0, 5).map(([browser, count]) => (
              <div key={browser} className="flex items-center justify-between p-2 rounded-lg bg-product-hover-background">
                <span className="text-product-foreground font-medium">{browser}</span>
                <Badge variant="outline" className="bg-product-primary/10 text-product-primary border-product-primary/20">
                  {count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-product-background to-hero-product-background border-product-border shadow-product-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-product-foreground flex items-center gap-2">
              <FiMonitor className="w-5 h-5 text-product-secondary" />
              Top Devices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topDevices.slice(0, 5).map(([device, count]) => (
              <div key={device} className="flex items-center justify-between p-2 rounded-lg bg-product-hover-background">
                <span className="text-product-foreground font-medium">{device}</span>
                <Badge variant="outline" className="bg-product-secondary/10 text-product-secondary border-product-secondary/20">
                  {count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-product-background to-hero-product-background border-product-border shadow-product-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-product-foreground flex items-center gap-2">
              <FiGlobe className="w-5 h-5 text-product-icon" />
              Top Countries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCountries.slice(0, 5).map(([country, count]) => (
              <div key={country} className="flex items-center justify-between p-2 rounded-lg bg-product-hover-background">
                <span className="text-product-foreground font-medium">{country}</span>
                <Badge variant="outline" className="bg-product-icon/10 text-product-icon border-product-icon/20">
                  {count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}

export default Analytics;