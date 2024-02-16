import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/primsadb';
import { checkSubscription } from '@/lib/subscription';

interface requestParams {
  companionId: string
}
export async function PATCH(req: Request, { params: { companionId } }: { params: requestParams }) {

  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!companionId) {
      return new NextResponse("CompanionId is required", { status: 400 })
    }

    //TODO: Try ZOD for validation
    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (
      !src ||
      !description ||
      !name ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const isUserSubscriped = await checkSubscription();
    if (!isUserSubscriped) {
      return new NextResponse("Pro Subscription required", { status: 403 })
    }

    const companion = await prismadb.companion.update({
      where: {
        id: companionId,
        userId: user.id
      },
      data: {
        userId: user.id,
        userName: user.firstName,
        categoryId,
        name,
        src,
        instructions,
        seed,
        description,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log('[COMPANION_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params: { companionId } }: { params: requestParams }) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const companion = await prismadb.companion.delete({
      where: {
        id: companionId,
        userId
      }
    })

    return NextResponse.json(companion)

  }
  catch (error) {
    console.log('[COMPANION_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}