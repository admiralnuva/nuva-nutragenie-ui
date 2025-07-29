import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SizedCardProps {
  title: string;
  cardName: string;
  description: string;
  avatar?: ReactNode;
  children?: ReactNode;
}

export function ExtraSmallCard({ title, cardName, description, avatar, children }: SizedCardProps) {
  return (
    <Card className="w-full h-24 bg-white border border-gray-200">
      <CardContent className="p-3 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 truncate">{title}</h3>
            <p className="text-xs text-gray-500 truncate">{cardName}</p>
            <p className="text-xs text-gray-400 truncate">{description}</p>
          </div>
          {avatar && (
            <div className="flex-shrink-0 ml-3">
              <div className="w-12 h-12 flex items-center justify-center">
                {avatar}
              </div>
            </div>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export function SmallCard({ title, cardName, description, avatar, children }: SizedCardProps) {
  return (
    <Card className="w-full min-h-32 h-auto bg-white border border-gray-200">
      <CardContent className="p-4 h-full">
        <div className="flex items-start justify-between h-full">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 mb-1">{cardName}</p>
            <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
          </div>
          {avatar && (
            <div className="flex-shrink-0 ml-4">
              <div className="w-16 h-16 flex items-center justify-center">
                {avatar}
              </div>
            </div>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export function MediumCard({ title, cardName, description, avatar, children }: SizedCardProps) {
  return (
    <Card className="w-full min-h-48 h-auto bg-white border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">{cardName}</p>
          </div>
          {avatar && (
            <div className="flex-shrink-0 ml-4">
              <div className="w-20 h-20 flex items-center justify-center">
                {avatar}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        {children}
      </CardContent>
    </Card>
  );
}

export function LargeCard({ title, cardName, description, avatar, children }: SizedCardProps) {
  return (
    <Card className="w-full h-96 bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
            <p className="text-base text-gray-500 mt-2">{cardName}</p>
          </div>
          {avatar && (
            <div className="flex-shrink-0 ml-4">
              <div className="w-24 h-24 flex items-center justify-center">
                {avatar}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-base text-gray-600 leading-relaxed mb-4">{description}</p>
        {children}
      </CardContent>
    </Card>
  );
}