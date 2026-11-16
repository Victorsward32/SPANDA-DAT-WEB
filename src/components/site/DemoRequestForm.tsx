import { useState, type SubmitEvent } from 'react';
import { Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { configurations } from '@/data/site';

const fields = [
  { name: 'name', label: 'Principal Investigator / Department Head', placeholder: 'Your full name', type: 'text', autoComplete: 'name' },
  { name: 'institution', label: 'Medical College / Teaching Hospital', placeholder: 'Institution name', type: 'text', autoComplete: 'organization' },
  { name: 'email', label: 'Official Email', placeholder: 'you@institution.edu', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Contact Number', placeholder: '+91', type: 'tel', autoComplete: 'tel' },
];

function downloadRequest(summary: string): void {
  const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'spanda-dat-demo-request.txt';
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function DemoRequestForm() {
  const [summary, setSummary] = useState('');
  const [draft, setDraft] = useState<Record<string, string>>({});

  function prepareRequest(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setDraft(Object.fromEntries(Array.from(values, ([key, value]) => [key, String(value)])));
    const configuration = configurations.find((item) => item.value === values.get('configuration'));
    const details = fields.map((field) => `${field.label}: ${String(values.get(field.name)).trim()}`);
    setSummary(['Spanda DAT — Demo Request', '', ...details, `System Configuration: ${configuration?.label ?? 'Please advise'}`].join('\n'));
  }

  if (summary) {
    return (
      <div className="request-preview" role="status">
        <span className="request-check"><Check aria-hidden="true" /></span>
        <h3>Your request is prepared</h3>
        <p>This preview has not sent your information. Download a copy of your request for your records.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={() => setSummary('')}>Edit details</Button>
          <Button onClick={() => downloadRequest(summary)}><Download aria-hidden="true" />Download request</Button>
        </div>
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={prepareRequest}>
      <div className="inquiry-fields">
        {fields.map((field) => (
          <div className={`inquiry-field inquiry-field--${field.name}`} key={field.name}>
            <Label htmlFor={`inquiry-${field.name}`}>{field.label}</Label>
            <Input id={`inquiry-${field.name}`} name={field.name} type={field.type} placeholder={field.placeholder} autoComplete={field.autoComplete} defaultValue={draft[field.name] ?? ''} required maxLength={200} />
          </div>
        ))}
        <div className="inquiry-field inquiry-field--configuration">
          <Label htmlFor="inquiry-configuration">System Configuration</Label>
          <select id="inquiry-configuration" name="configuration" defaultValue={draft.configuration ?? ''}>
            <option value="">Select a system configuration…</option>
            {configurations.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
          </select>
        </div>
      </div>
      <p className="form-note">Preview form — your information is not sent or stored.</p>
      <div className="inquiry-actions">
        <DialogClose asChild><Button variant="ghost" type="button">Cancel</Button></DialogClose>
        <Button type="submit" className="rounded-full">Prepare Request</Button>
      </div>
    </form>
  );
}
