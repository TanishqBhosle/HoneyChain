import React from 'react';
import { Check, Clock } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  actor: string;
  status: 'completed' | 'current' | 'pending';
  icon?: string;
}

interface BatchTimelineProps {
  events: TimelineEvent[];
}

export function BatchTimeline({ events }: BatchTimelineProps) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white",
                    event.status === 'completed' ? "bg-emerald-500" : 
                    event.status === 'current' ? "bg-amber-500" : "bg-slate-200"
                  )}>
                    {event.status === 'completed' ? (
                      <Check className="h-4 w-4 text-white" aria-hidden="true" />
                    ) : event.status === 'current' ? (
                      <Clock className="h-4 w-4 text-white animate-pulse" aria-hidden="true" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-slate-400" />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {event.icon && <span className="mr-2">{event.icon}</span>}
                      {event.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{event.description}</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">By: {event.actor}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-slate-500">
                    <time dateTime={event.date}>{event.date ? formatDate(event.date) : 'Pending'}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
