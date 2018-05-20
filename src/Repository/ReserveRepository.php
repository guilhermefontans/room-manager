<?php

namespace App\Repository;

use App\Entity\Reserve;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Reserve|null find($id, $lockMode = null, $lockVersion = null)
 * @method Reserve|null findOneBy(array $criteria, array $orderBy = null)
 * @method Reserve[]    findAll()
 * @method Reserve[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReserveRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Reserve::class);
    }

    public function findAllArray()
    {
        $qb = $this
            ->createQueryBuilder('u')
            ->select('u');
        return $qb->getQuery()->getArrayResult();
    }
}
