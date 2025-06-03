import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import DashboardView from '../../components/DashboardView';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/login');
  }

  return <DashboardView user={session.user} />;
}
