"use client";
import React from 'react'
import LineChart from '../../charts/LineChart'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../../ui/table";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";

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
  const browserCounts = rawEvents.reduce((acc, e) => {
    const browser = e.properties?.$browser;
    if (browser) acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topBrowsers = Object.entries(browserCounts).map(([browser, count]) => [browser, Number(count)]).sort((a, b) => Number(b[1]) - Number(a[1]));
  // Top devices
  const deviceCounts = rawEvents.reduce((acc, e) => {
    const device = e.properties?.$device_type;
    if (device) acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topDevices = Object.entries(deviceCounts).map(([device, count]) => [device, Number(count)]).sort((a, b) => Number(b[1]) - Number(a[1]));
  // Top countries
  const countryCounts = rawEvents.reduce((acc, e) => {
    const country = e.properties?.$geoip_country_name;
    if (country) acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topCountries = Object.entries(countryCounts).map(([country, count]) => [country, Number(count)]).sort((a, b) => Number(b[1]) - Number(a[1]));

  // For progress bars, get max for each section
  const browserTotal = topBrowsers.reduce((sum, [, count]) => sum + Number(count), 0) || 1;
  const deviceTotal = topDevices.reduce((sum, [, count]) => sum + Number(count), 0) || 1;
  const countryTotal = topCountries.reduce((sum, [, count]) => sum + Number(count), 0) || 1;

  return (
    <Card className="w-full max-w-[1000px] mx-auto text-gray-900">
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Key metrics and insights for your restaurant</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="flex flex-col items-center justify-center p-4">
            <Badge className="mb-2 text-white">Total Page Views</Badge>
            <span className="text-2xl font-bold text-gray-900">{totalPageViews}</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4">
            <Badge className="mb-2 text-white">Unique Visitors</Badge>
            <span className="text-2xl font-bold text-gray-900">{uniqueVisitors}</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4">
            <Badge className="mb-2 text-white">Most Popular Day</Badge>
            <span className="text-lg font-bold text-gray-900">{mostPopularDay && mostPopularDay.date ? mostPopularDay.date : '-'}</span>
            <span className="text-gray-900 text-sm">{mostPopularDay && mostPopularDay.date ? `${mostPopularDay.count} views` : ''}</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4">
            <Badge className="mb-2 text-white">Avg. Views/Day</Badge>
            <span className="text-2xl font-bold text-gray-900">{avgPageViews}</span>
          </Card>
        </div>
        <Separator className="my-6" />
        <div className="mb-8">
          <LineChart data={data} />
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Browsers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Browser</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topBrowsers.map(([browser, count]) => (
                    <TableRow key={browser}>
                      <TableCell className="text-gray-900 font-bold">{browser}</TableCell>
                      <TableCell className="text-gray-900 font-bold">{count}</TableCell>
                      <TableCell className="w-32">
                        <Progress value={Math.round((Number(count) / browserTotal) * 100)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topDevices.map(([device, count]) => (
                    <TableRow key={device}>
                      <TableCell className="text-gray-900 font-bold">{device}</TableCell>
                      <TableCell className="text-gray-900 font-bold">{count}</TableCell>
                      <TableCell className="w-32">
                        <Progress value={Math.round((Number(count) / deviceTotal) * 100)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCountries.map(([country, count]) => (
                    <TableRow key={country}>
                      <TableCell className="text-gray-900 font-bold">{country}</TableCell>
                      <TableCell className="text-gray-900 font-bold">{count}</TableCell>
                      <TableCell className="w-32">
                        <Progress value={Math.round((Number(count) / countryTotal) * 100)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
export default Analytics