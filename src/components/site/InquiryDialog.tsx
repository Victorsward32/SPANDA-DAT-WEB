import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DemoRequestForm from './DemoRequestForm';

export type InquiryView = 'demo' | 'configurations' | 'support';

interface Props {
  view: InquiryView;
  onClose: () => void;
  onRequestDemo: () => void;
  onRestoreFocus: () => void;
}

export default function InquiryDialog({ view, onClose, onRequestDemo, onRestoreFocus }: Props) {
  const isSupport = view === 'support';

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="inquiry-dialog" onCloseAutoFocus={(event) => {
        event.preventDefault();
        onRestoreFocus();
      }}>
        <DialogHeader className="inquiry-heading">
          <p className="inquiry-kicker">{isSupport ? 'Here to Help' : 'Institutional Inquiries'}</p>
          <DialogTitle>{isSupport ? 'How can we help?' : 'Spanda DAT Technical Dossier'}</DialogTitle>
          <DialogDescription>
            {isSupport
              ? 'Find the right learning environment for your institution.'
              : 'Tell us about your institution and the system you would like to explore.'}
          </DialogDescription>
        </DialogHeader>
        {isSupport ? (
          <div className="support-content">
            <p>Spanda DAT brings together manikin simulation and live patient auscultation, with speaker-based group learning and individual receivers.</p>
            <p>For help choosing a configuration or planning a demonstration, prepare an inquiry with your institution’s details.</p>
            <Button className="rounded-full" onClick={onRequestDemo}>Prepare an inquiry</Button>
          </div>
        ) : <DemoRequestForm />}
      </DialogContent>
    </Dialog>
  );
}
