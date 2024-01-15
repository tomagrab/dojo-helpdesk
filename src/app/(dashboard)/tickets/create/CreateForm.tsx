import { addTicket } from '@/app/(dashboard)/tickets/actions';
import SubmitButton from '@/components/ui/submitButton';

export default function CreateForm() {
  return (
    <form className="w-1/2" action={addTicket}>
      <label>
        <span>Title:</span>
        <input name="title" required type="text" />
      </label>
      <label>
        <span>Body:</span>
        <textarea name="body" required />
      </label>
      <label>
        <span>Priority:</span>
        <select name="priority">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <SubmitButton />
    </form>
  );
}
